const router = require('express').Router()

router.get('/', (req, res, next) => {
    Promise.resolve('Auth Router /')
})

module.exports = router