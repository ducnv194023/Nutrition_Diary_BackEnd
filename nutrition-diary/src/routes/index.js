'use strict'

const express = require('express')
const { apiKey } = require('../auth/checkAuth')
const router = express.Router()
const AccessRouter = require('./access/index')

route.use(apiKey)
router.use('/access', AccessRouter)

module.exports = router
