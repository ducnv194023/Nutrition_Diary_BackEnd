'use strict'

const KeyToken = require('../models/keyToken.model')

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        refreshToken,
    }) => {
        const publicKeyString = publicKey.toString()

        const filter = {
          user: userId,
        }
        
        const update = {
          publicKey: publicKeyString,
          refreshTokensUsed: [],
          refreshToken
        }

        const options = {
          upsert: true,
          new: true
        }

        const tokens =  await KeyToken.findOneAndUpdate(filter, update, options)

        return tokens ? publicKeyString : null
    }
}

module.exports = KeyTokenService