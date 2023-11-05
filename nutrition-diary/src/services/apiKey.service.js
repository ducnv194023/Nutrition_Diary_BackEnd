'use strict'

const ApiKeyModel = require('../models/apiKey.model')

class ApiKeyService {
    static getApi = async (key) => {
        const objKey = await ApiKeyModel.findOne({
            key,
            status: true
        })
        .lean()
    }
}

module.exports = ApiKeyService