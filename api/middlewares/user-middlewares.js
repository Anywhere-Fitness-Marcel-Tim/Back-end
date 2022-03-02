const userModel = require('../users/users-model')
const yup = require('yup')

const checkUserExists = (req, res, next) => {
    userModel.findById(req.params.id)
    .then(user => {
        if(!user || user.length === 0){
            next({status: 404, message: 'User does not exist'})
        } else {
            next()
        }
    }).catch(next)
}

const userSchema = yup.object({
    username: yup.string().trim().min(3).required(),
    password: yup.string().trim().min(4).required(),
    user_email: yup.string().email(),
    role_id: yup.number()
})

const checkUserPayload = (req,res,next) =>{
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: "username and password are required" });
    return
  } else {
    userSchema
        .validate(req.body)
        .then(validatedPayload => {
            req.body = validatedPayload
            next();
        })
        .catch(next)
  }
}

const userModifiedSchema = yup.object({
    username: yup.string().trim().min(3).required(),
    user_email: yup.string().email(),
    role_id: yup.number()
})

const checkUserModifiedPayload = async (req, res, next) => {
    try{
        const validatedPayload = await userModifiedSchema.validate(req.body)
        req.body = validatedPayload
        next()
    } catch(err){
        next(err)
    }
}


module.exports = {
    checkUserExists,
    checkUserPayload,
    checkUserModifiedPayload,
}