const express = require('express')

const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const AccessController = require('../../controllers/access.controller')
const { authentication } = require('../../auth/authUtils')


// signUp
router.post('/signup', asyncHandler(AccessController.signUp))
router.post('/login', asyncHandler(AccessController.login))

// authentication
router.use(authentication)
router.post('/logout', asyncHandler(AccessController.logout))

module.exports = router