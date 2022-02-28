const router = require('express').Router()
const userModel = require('./users-model')

router.get('/', (req, res, next) => {
    userModel.find()
    .then(users => {
        res.status(200).json(users)
    }).catch(next)
})

module.exports = router