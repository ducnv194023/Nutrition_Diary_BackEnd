'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')

const AccessService = require('../services/access.service')

class AccessController {
    login = async (req, res, next) => {
        new SuccessResponse({
            message: 'Login successfully',
            data: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Sign up successfully',
            data: await AccessService.signUp(req.body)
        }).send(res)
    }
}

const accessController = new AccessController()
module.exports = accessController