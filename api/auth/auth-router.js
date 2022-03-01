const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('../middlewares/auth-middlewares')
const { checkUserPayload } = require('../middlewares/user-middlewares')
const JWT_SECRET = require("../secrets"); // use this secret!
const bcrypt = require("bcryptjs");
const userModel = require('../users/users-model');
const jwt = require('jsonwebtoken')

router.post("/register", validateRoleName, (req, res, next) => {
    const { username, password, user_email } = req.body
    const { role_id } = req
    const hash = bcrypt.hashSync(password, 8)
    userModel.add({username, password: hash, user_email, role_id})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});


router.post("/login", checkUsernameExists, async (req, res, next) => {
  const {username, password} = req.body
  if(bcrypt.compareSync(password, req.user.password)){
    const user = await userModel.findBy({username: username})
    const token = makeToken(user)
    res.json({
      message: `Welcome back, ${username}!`,
      token
    })
  } else {
    next({status: 401, message: 'Invalid credentials'})
  }
});

function makeToken(user){
  const payload = {
    subject: user[0].user_id,
    role_id: user[0].role_id,
    username: user[0].username,
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;