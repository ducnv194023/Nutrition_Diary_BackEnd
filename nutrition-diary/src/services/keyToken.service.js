'use strict'

const KeyToken = require('../models/keyToken.model')
const { Types } = require('mongoose')

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

  static findByUserId = async (userId) => {
    return await KeyToken.findOne({ userId: Types.ObjectId(userId) }).lean()
  }

  static removeKeyById = async (id) => {
    return await KeyToken.remove(id)
  }
}

module.exports = KeyTokenService