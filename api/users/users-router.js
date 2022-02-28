const router = require('express').Router()

router.get('/', (req, res, next) => {
    Promise.resolve('Users Router /')
})

module.exports = router