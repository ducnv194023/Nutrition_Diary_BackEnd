const mongoose = require('mongoose')

const keyTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  publicKey: {
    type: String,
    required: true,
  },
  refreshTokensUsed: {
    type: Array,
    default: []
  },
  refreshToken : {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const KeyToken = mongoose.model('KeyToken', keyTokenSchema)

module.exports = KeyToken
