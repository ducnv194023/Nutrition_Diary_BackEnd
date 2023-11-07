const express = require('express')

const router = express.Router()
const { asyncHandler } = require('../../auth/checkAuth')
const AccessController = require('../../controllers/access.controller')


// signUp
router.post('/signup', asyncHandler(AccessController.signUp))

module.exports = router