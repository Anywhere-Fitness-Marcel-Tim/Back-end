const userModel = require('../users/users-model')
const yup = require('yup')

const checkUserExists = (req, res, next) => {
    userModel.findById(req.params.id)
    .then(user => {
        if(!user || user.length === 0){
            next({status: 404, message: 'User does not exist'})
        } else {
            next()
        }
    }).catch(next)
}

const userSchema = yup.object({
    username: yup.string().trim().min(3).required(),
    password: yup.string().trim().min(4).required(),
    user_email: yup.string().email(),
    role_id: yup.number().required()
})

const checkUserPayload = async (req, res, next) => {
    try{
        const validatedPayload = await userSchema.validate(req.body)
        req.body = validatedPayload
        next()
    } catch(err){
        next(err)
    }
}

const userModifiedSchema = yup.object({
    username: yup.string().trim().min(3).required(),
    user_email: yup.string().email()
})

const checkUserModifiedPayload = async (req, res, next) => {
    try{
        const validatedPayload = await userModifiedSchema.validate(req.body)
        req.body = validatedPayload
        next()
    } catch(err){
        next(err)
    }
}


module.exports = {
    checkUserExists,
    checkUserPayload,
    checkUserModifiedPayload
}