'use strict'

const express = require('express')
const { apiKey, permissions } = require('../auth/checkAuth')
const router = express.Router()
const AccessRouter = require('./access/index')

route.use(apiKey)
route.use(permissions('0000'))
router.use('/access', AccessRouter)

module.exports = router
