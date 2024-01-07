const mongoose = require('mongoose')

const mealDiarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  foodId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Food',
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  diaryType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    default: 'breakfast'
  },
  status: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'enabled'
  },
}, {
  timestamps: true
})

const MealDiary = mongoose.model('MealDiary', mealDiarySchema)

module.exports = MealDiary
