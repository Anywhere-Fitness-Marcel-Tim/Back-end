const router = require('express').Router()
const { checkOrderExists, checkOrderPayload } = require('../middlewares/orders-middlewares')
const {restricted, only} = require('../middlewares/auth-middlewares')
const orderModel = require('./orders-model')

router.get('/', restricted, only(3), (req, res, next) => {
    orderModel.find()
    .then(orders => {
        res.status(200).json(orders)
    }).catch(next)
})

router.get('/:id', restricted, only(3), checkOrderExists, (req, res, next) => {
    orderModel.findById(req.params.id)
    .then(order => {
        res.status(200).json(order)
    }).catch(next)
})

router.put('/:id', restricted, only(3), checkOrderExists, checkOrderPayload, (req, res, next) => {
    orderModel.modify(req.params.id, req.body)
    .then(updatedOrder => {
        res.status(201).json(updatedOrder)
    })
})

router.post('/', restricted, only(3), checkOrderPayload, (req, res, next) => {
    orderModel.add(req.body)
    .then(newOrder => {
        res.status(201).json(newOrder)
    }).catch(next)
})

router.delete('/:id', restricted, only(3), checkOrderExists, (req, res, next) => {
    orderModel.remove(req.params.id)
    .then(deletedOrder => {
        res.status(200).json({...deletedOrder, message: 'Order Removed'})
    }).catch(next)
})

module.exports = router