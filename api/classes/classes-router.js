const router = require('express').Router()
const { checkClassExists, checkClassPayload } = require('../middlewares/classes-middlewares')
const {only, restricted} = require('../middlewares/auth-middlewares')
const classModel = require('./classes-model')

router.get('/', restricted, only(2,3), (req, res, next) => {
    classModel.find()
    .then(classes => {
        res.status(200).json(classes)
    }).catch(next)
})

router.get('/:id', restricted, only(2,3), checkClassExists, (req, res, next) => {
    classModel.findById(req.params.id)
    .then(specificClass => {
        res.status(200).json(specificClass)
    }).catch(next)
})

router.put('/:id', restricted, only(2,3), checkClassExists, checkClassPayload, (req, res, next) => {
    classModel.modify(req.params.id, req.body)
    .then(updatedClass => {
        res.status(201).json(updatedClass)
    })
})

router.post('/', restricted, only(2,3), checkClassPayload, (req, res, next) => {
    classModel.add(req.body)
    .then(newClass => {
        res.status(201).json(newClass)
    }).catch(next)
})

router.delete('/:id', restricted, only(2,3), checkClassExists, (req, res, next) => {
    classModel.remove(req.params.id)
    .then(deletedClass => {
        res.status(200).json({...deletedClass, message: 'Class Removed'})
    }).catch(next)
})

module.exports = router