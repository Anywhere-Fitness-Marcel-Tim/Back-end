const router = require('express').Router()
const classModel = require('./classes-model')

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Classses router /'})
})

module.exports = router