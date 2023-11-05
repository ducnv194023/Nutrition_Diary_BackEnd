const express = require('express')
const AccessController = require('../../controllers/access.controller')
const router = express.Router()

// signUp
router.post('/signup', AccessController.signUp)

module.exports = router