'use strict'

const jwt = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')

// service 
const KeyTokenService = require('../services/keyToken.service')


const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION : 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = await jwt.sign(payload, privateKey, { 
        algorithm: 'RS256',
        expiresIn: '2 days' 
    })

    const refreshToken = await jwt.sign(payload, privateKey, { 
        algorithm: 'RS256',
        expiresIn: '7 days' 
    })

    jwt.verify(accessToken, publicKey, (err, decoded) => {
        if (err) {
            console.log('err', err)
        }
        else {
            console.log('decode', decoded)
        }
    })

    return {
        accessToken,
        refreshToken
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailureError('Invalid Request')

    const keyStore = await KeyTokenService.findByUserId(userId)

    if (!keyStore) throw new NotFoundError('Not found keyStore')

    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if (!accessToken) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = jwt.verify(accessToken, keyStore.publicKey)

        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid user')

        req.keyStore = keyStore

        return next()
    } catch(error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authentication,
}