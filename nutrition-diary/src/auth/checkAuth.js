'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION : 'authorization'
}
const ApiKeyService = require('../services/apiKey.service')

const apiKey = async (req, res, next) => {
    try {
        const key = req.header[HEADER.API_KEY]?.toString()

        if (!key) {
            return res.status(403).json({
                messages: 'Forbidden!!'
            })
        }

        const objectKey = await ApiKeyService.getApi(key)

        if (!objectKey) {
            return res.status(403).json({
                messages: 'Forbidden!!'
            })
        }

        req.objectKey = objectKey
        return next()
    }
    catch (error) {
        next(error)
    }
}

const permissions = (permissions) => {
    return (req,res,next) => {
        if (!req.objectKey.permissions) {
            return res.status(403).json({
                messages: 'permission denied!!'
            })
        }

        const validPermission = req.objectKey.permissions.includes(permissions)

        if (!validPermission) {
            return res.status(403).json({
                messages: 'permission denied!!'
            })
        }

        return next()
    }
}
module.exports = {
    apiKey,
    permissions,
}