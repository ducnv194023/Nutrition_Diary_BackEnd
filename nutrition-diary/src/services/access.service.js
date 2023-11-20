'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { RoleApp } = require('../utils/constant')
const { createTokenPair } = require('../auth/authUtils')
const { getIntoData } = require('../utils/index')
const { BadRequestError, AuthFailureError } = require('../core/error.response')

const User = require('../models/user.model')
const KeyTokenService = require('./keyToken.service')
const UserService = require('./user.service')

class AccessService {
    static login = async ({ phone, password, refreshToken = null }) => {
        const existUser = await UserService.findByPhone({phone})

        if(!existUser) {
          throw new BadRequestError('User not found')
        }

        const match = bcrypt.compareSync(password, existUser.password)

        if(!match) {
          throw new AuthFailureError('Wrong password')
        }

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
            userId: existUser._id,
            publicKey,
        })

        const tokens = await createTokenPair(
            {
                userId: existUser._id,
                role: existUser.role
            }, 
            publicKeyString,
            privateKey
        )

        await KeyTokenService.createKeyToken({
            userId: existUser._id,
            publicKey,
            refreshToken: tokens.refreshToken,
        })


        return {
            user: getIntoData({fields: ['_id', 'name', 'phone', 'role'], object: existUser}),
            tokens
        }
    }

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
                user: getIntoData({fields: ['_id', 'name', 'phone', 'role'], object: newUser}),
                tokens
            }
        }

        throw new BadRequestError('Sign up failed')
    }

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)

        return delKey
    }
}

module.exports = AccessService