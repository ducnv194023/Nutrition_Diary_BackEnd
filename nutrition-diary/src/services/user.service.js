'use strict'

const UserModel = require('../models/user.model')

const findByPhone = async ({
    phone,
    select = {
        email: 1,
        password: 1,
        name: 1,
        status: 1,
        role: 1
    }
}) => { 
    return UserModel.findOne({ phone }).select(select).lean()
}

module.exports = {
    findByPhone
}