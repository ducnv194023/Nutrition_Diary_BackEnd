const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  currentGoal: {
    type: Number,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'enabled'
  },
}, {
  timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
