'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { RoleApp } = require('../utils/constant')
const { createTokenPair } = require('../auth/authUtils')
const { getIntoData } = require('../utils/index')
const { BadRequestError } = require('../core/error.response')

const User = require('../models/user.model')
const KeyTokenService = require('./keyToken.service')

class AccessService {
    static signUp = async (name, phone, password) => {
        const user = await User.findOne({ phone }).lean()

        if (user) {
            throw new BadRequestError('Phone number already exists')
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
        throw new BadRequestError('Sign up failed')
    }
}

module.exports = AccessService