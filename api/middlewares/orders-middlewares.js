const orderModel = require('../orders/orders-model')
const yup = require('yup')

const checkOrderExists = (req, res, next) => {
    orderModel.findById(req.params.id)
    .then(order => {
        if(!order){
            next({status: 404, message: 'Order does not exist'})
        } else {
            next()
        }
    }).catch(next)
}

const orderSchema = yup.object({
    order_content: yup.string().trim().min(5).required(),
    order_quantity: yup.number().required(),
    order_price_total: yup.number().required(),
    user_id: yup.number().required(),
    order_paid: yup.bool()
})

const checkOrderPayload = async (req, res, next) => {
    try{
        const validatedPayload = await orderSchema.validate(req.body)
        req.body = validatedPayload
        next()
    } catch(err){
        next(err)
    }
}


module.exports = {
    checkOrderExists,
    checkOrderPayload
}