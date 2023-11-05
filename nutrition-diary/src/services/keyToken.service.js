'use strict'

const KeyToken = require('../models/keyToken.model')

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
    }) => {
        const publicKeyString = publicKey.toString()

        const tokens =  await KeyToken.create({
            userId,
            publicKey: publicKeyString
        })

        return tokens ? publicKeyString : null
    }
}

module.exports = KeyTokenService