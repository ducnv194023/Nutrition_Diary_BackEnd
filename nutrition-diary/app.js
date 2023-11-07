const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

const app = express()
const route = require('./src/routes/index')

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// init db
require('./src/dbs/init.mongodb')
// init routes
app.use('/nutrition-diary', route)
// handle error

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)

})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || 'Internal Server Error'
    res.status(status).json({
        code: status,
        message
    })
})
// init server

module.exports = app