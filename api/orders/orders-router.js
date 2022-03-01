const router = require('express').Router()
const { checkOrderExists, checkOrderPayload } = require('../middlewares/orders-middlewares')
const orderModel = require('./orders-model')

router.get('/', (req, res, next) => {
    orderModel.find()
    .then(orders => {
        res.status(200).json(orders)
    }).catch(next)
})

router.get('/:id', checkOrderExists, (req, res, next) => {
    orderModel.findById(req.params.id)
    .then(order => {
        res.status(200).json(order)
    }).catch(next)
})

router.put('/:id', checkOrderExists, checkOrderPayload, (req, res, next) => {
    orderModel.modify(req.params.id, req.body)
    .then(updatedOrder => {
        res.status(201).json(updatedOrder)
    })
})

router.post('/', checkOrderPayload, (req, res, next) => {
    orderModel.add(req.body)
    .then(newOrder => {
        res.status(201).json(newOrder)
    }).catch(next)
})

router.delete('/:id', checkOrderExists, (req, res, next) => {
    orderModel.remove(req.params.id)
    .then(deletedOrder => {
        res.status(200).json({...deletedOrder, message: 'Order Removed'})
    }).catch(next)
})

module.exports = router