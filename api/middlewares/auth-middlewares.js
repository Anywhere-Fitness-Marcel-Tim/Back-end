const JWT_SECRET  = require('../secrets')
const jwt = require('jsonwebtoken')
const userModel = require('../users/users-model')

const restricted = (req, res, next) => {
      const token = req.headers.authorization
      if(!token){
        next({status: 401, message: 'Token required'})
      }

      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if(err){
          next({status: 401, message: 'Token invalid'})
        } else {
          req.decodedToken = decodedToken
          next()
        }
      })
  }
  
  const only = (role_id1, role_id2) => (req, res, next) => {
   if(role_id1 === req.decodedToken.role_id || role_id2 === req.decodedToken.role_id) {
     next()
   } else {
     next({status: 403, message: 'You do not have the appropriate access'})
   }
  }
  
  
  const checkUsernameExists = async (req, res, next) => {
      try{
        const [user] = await userModel.findBy({username: req.body.username})
        if(!user){
          next({status: 401, message: 'invalid credentials'})
        } else {
          req.user = user
          next()
        }
      } catch(err){
        next(err)
      }
  }
  
  
  const validateRoleName = (req, res, next) => {
    if(!req.body.role_id){
     req.role_id = 1
     next()
    } else if(req.body.role_id === 3 || req.body.role_id === 2) {
     next({status: 422, message: 'Users cannot set their own roles'})
    } else {
      next()
    }
  }




module.exports = {
    restricted,
    checkUsernameExists,
    validateRoleName,
    only,
  }