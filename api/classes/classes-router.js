const router = require('express').Router()
const classModel = require('./classes-model')

router.get('/', (req, res, next) => {
    classModel.find()
    .then(classes => {
        res.status(200).json(classes)
    }).catch(next)
})

module.exports = router