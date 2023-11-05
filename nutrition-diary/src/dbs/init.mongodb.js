'use strict'

const mongoose = require('mongoose')

const { db } = require('../configs/config.mongodb')

const connectString = db

class Database {
    constructor() {
        this.connect()
    }

    connect(type='mongodb') {
        mongoose.connect(connectString).then( _ => console.log('Database connected'))
        .catch(err => console.log(err))
    }

    static getInstance () {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance
    }
}

const instance = Database.getInstance()

module.exports = instance