const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const classRouter = require('./classes/classes-router')
const orderRouter = require('./orders/orders-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/classes', classRouter)
server.use('/api/orders', orderRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'The coding gods are mad',
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;