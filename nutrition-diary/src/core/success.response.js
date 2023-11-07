'use strict'

const { StatusCode, ReasonStatusCode } = require('../utils/constant')

class SuccessResponse {
    constructor({message, statusCode =  StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, data = {}}) {
        this.message = !message ? reasonStatusCode : message
        this.statusCode = statusCode
        this.data = data
    }

    send(res, header = {}) {
        return res.status(this.status)
            .json(this)
    }
}

class OK extends SuccessResponse {
    constructor({message, data}) {
        super({message, data})
    }
}

class CREATED extends SuccessResponse {
    constructor({options = {}, message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, data}) {
        super({message, statusCode, reasonStatusCode, data})

        this.options = options
    }
}

module.exports = {
    OK,
    CREATED
}