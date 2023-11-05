'use strict'

const AccessService = require('../services/access.service')

class AccessController {
    signUp = async (req, res, next) => {
        try {
            const requestBody = req.body
            const { name, phone, password } = requestBody

            const result = await AccessService.signUp(name, phone, password)
            
            return res.status(result.code).json(result.metadata)
        }
        catch (error) {
            next(error)
        }
    }
}

const accessController = new AccessController()
module.exports = accessController