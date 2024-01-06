const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
})

const Exercise = mongoose.model('User', exerciseSchema)

module.exports = Exercise
