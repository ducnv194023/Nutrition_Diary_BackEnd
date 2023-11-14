'use strict'

const { StatusCode, ReasonStatusCode } = require('../utils/constant')

class ErrorResponse extends Error {
    constructor (message, status) {
        super(message)

        this.status = status
    }
}


class BadRequestError extends ErrorResponse {
    constructor (message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class InternalServerError extends ErrorResponse {
    constructor (message = ReasonStatusCode.INTERNAL_SERVER, statusCode = StatusCode.INTERNAL_SERVER) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor (message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

module.exports = {
    ErrorResponse,
    BadRequestError,
    InternalServerError,
    AuthFailureError
}