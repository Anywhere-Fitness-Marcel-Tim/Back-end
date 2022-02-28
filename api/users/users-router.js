const router = require('express').Router()
const userModel = require('./users-model')

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'users router /'})
})

module.exports = router