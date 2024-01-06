const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  calories: {
    type: Number,
    required: true,
  },
  cholesterol: {
    type: Number,
    required: false,
  },
  protein: {
    type: Number,
    required: false,
  },
  sodium: {
    type: Number,
    required: false,
  },
  fat: {
    type: Number,
    required: false,
  },
  carbohydrate: {
    type: Number,
    required: false,
  },
  fiber: {
    type: Number,
    required: false,
  },
  sugar: {
    type: Number,
    required: false,
  },
  saturatedFat: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'enabled'
  },
}, {
  timestamps: true
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
