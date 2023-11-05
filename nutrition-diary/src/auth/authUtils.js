'use strict'

const jwt = require('jsonwebtoken')

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

module.exports = {
    createTokenPair
}