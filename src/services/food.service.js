const _ = require('lodash')
const Food = require('../models/food.model')
const Message = require('../utils/Message')
const { status, FoodType } = require('../utils/constant')
const pick = require('../utils/pick')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')

// create food
const createFood = async (foodBody) => {
  // check exist
  const existedFood = await Food.findOne({
    name: _.get(foodBody, 'name'),
    status: {
      $ne: status.disabled
    }
  })

  throwBadRequest(existedFood, Message.foodMsg.nameExisted)

  const food = pick(foodBody, [
    'name',
    'brand',
    'description',
    'image',
    'calories',
    'cholesterol',
    'protein',
    'sodium',
    'fat',
    'carbohydrate',
    'fiber',
    'sugar',
    'saturatedFat',
  ])

  return Food.create(food)
}

// lấy tất cả món ăn
const getFoods = async (requestBody) => {
  const filter = {}
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled
    }
  }

  return Food.find({ ...filter })
}

const updateFoodById = async (foodUpdateRequest) => {
  const foodId = _.get(foodUpdateRequest, 'foodId')
  const foodBody = pick(foodUpdateRequest, [
    'name',
    'brand',
    'description',
    'image',
    'calories',
    'cholesterol',
    'protein',
    'sodium',
    'fat',
    'carbohydrate',
    'fiber',
    'sugar',
    'saturatedFat',
  ])
  const updateFood = await Food.findByIdAndUpdate(
    foodId, foodBody, { new: true }
  )
  throwBadRequest(!updateFood, Message.foodMsg.notFound)
  return updateFood
}

const deleteFoodById = async (foodId) => {
  const deleteFood = await Food.updateOne(
    { _id: foodId }, { status: status.disabled }
  )
  return deleteFood
}

module.exports = {
  createFood,
  getFoods,
  updateFoodById,
  deleteFoodById,
}