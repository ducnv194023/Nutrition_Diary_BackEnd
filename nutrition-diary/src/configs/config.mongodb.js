const dev = {
    app: {
        port: process.env.DEV_PORT || 3000,
    },
    db: process.env.DEV_MONGO_URL || 'mongodb+srv://database:database@cluster0.emujpnm.mongodb.net/?retryWrites=true&w=majority',
}

const pro = {
    app: {
        port: process.env.PRO_PORT || 3000,
    },
    db: process.env.PRO_MONGO_URL || 'mongodb+srv://database:database@cluster0.emujpnm.mongodb.net/?retryWrites=true&w=majority',
}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
