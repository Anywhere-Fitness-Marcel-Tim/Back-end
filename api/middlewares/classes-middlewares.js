const classModel = require('../classes/classes-model')
const yup = require('yup')

const checkClassExists = (req, res, next) => {
    classModel.findById(req.params.id)
    .then(validClass => {
        if(!validClass){
            next({status: 404, message: 'Class does not exist'})
        } else {
            next()
        }
    }).catch(next)
}

const classSchema = yup.object({
    class_type: yup.string().trim().min(3).required(),
    class_price: yup.number().required(),
    class_location: yup.string().trim().min(3).required(),
    class_intensity: yup.string().trim().min(3).required(),
    class_size: yup.number(),
    class_max_size: yup.number().required(),
    class_time: yup.string().trim().min(3).required(),
})

const checkClassPayload = async (req, res, next) => {
    try{
        const validatedPayload = await classSchema.validate(req.body)
        req.body = validatedPayload
        next()
    } catch(err){
        next(err)
    }
}


module.exports = {
    checkClassExists,
    checkClassPayload
}