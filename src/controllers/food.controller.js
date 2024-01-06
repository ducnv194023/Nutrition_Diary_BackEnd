const catchAsync = require('../utils/catchAsync')
const Message = require('../utils/Message')
const { sendSuccess } = require('../libs/response')
const foodService = require('../services/food.service')

const createFood = catchAsync(async (req, res) => {
  const newFood = await foodService.createFood(req.body)
  sendSuccess({ res, data: newFood, message: Message.foodMsg.created })
})

const getFoods = catchAsync(async (req, res) => {
  const foods = await foodService.getFoods(req.body)
  sendSuccess({ res, data: foods, message: Message.foodMsg.success })
})

const updateFoodById = catchAsync(async (req, res) => {
  await foodService.updateFoodById(req.body)
  sendSuccess({ res, message: Message.foodMsg.success })
})

const deleteFoodById = catchAsync(async (req, res) => {
  const { foodId } = req.params
  await foodService.deleteFoodById(foodId)
  sendSuccess({ res, message: Message.foodMsg.success })
})

module.exports = {
    createFood,
    getFoods,
    updateFoodById,
    deleteFoodById,
}