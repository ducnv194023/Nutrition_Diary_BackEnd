'use strict'

const { CREATED } = require('../core/success.response')

const AccessService = require('../services/access.service')

class AccessController {
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Sign up successfully',
            data: await AccessService.signUp(req.body)
        }).send(res)
    }
}

const accessController = new AccessController()
module.exports = accessController