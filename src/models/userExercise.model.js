const mongoose = require('mongoose')

const userExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Exercise',
    required: true
  },
  status: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'enabled'
  },
}, {
  timestamps: true
})

const UserExercise = mongoose.model('UserExercise', userExerciseSchema)

module.exports = UserExercise
