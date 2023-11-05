'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/user.model')
const { RoleApp } = require('../utils/constant')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getIntoData } = require('../utils')

class AccessService {
    static signUp = async (name, phone, password) => {
        try {
            const user = await User.findOne({ phone }).lean()
            console.log('user', user)
            if (user) {
                throw new Error('User existed')
            }
            
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                name,
                phone,
                password: passwordHash,
                role: RoleApp.USER
            })

            if (newUser) {
                const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem',
                    },
                })

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey,
                })

                const tokens = await createTokenPair(
                    {
                        userId: newUser._id,
                        role: newUser.role
                    }, 
                    publicKeyString, 
                    privateKey
                )
                return {
                    code: 201,
                    metadata: {
                        user: getIntoData({fields: ['_id', 'name', 'phone', 'role'], object: newUser}),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = AccessService