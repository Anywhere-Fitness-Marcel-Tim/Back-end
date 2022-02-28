const router = require('express').Router()

router.get('/', (req, res, next) => {
    Promise.resolve('classes Router /')
})

module.exports = router