const catchAsync = require('../utils/catchAsync')
const Message = require('../utils/Message')
const { sendSuccess } = require('../libs/response')
const mealDiaryService = require('../services/mealDiary.service')

const createMealDiary = catchAsync(async (req, res) => {
  const newMealDiary = await mealDiaryService.createMealDiary(req.body)
  sendSuccess({ res, data: newMealDiary, message: Message.mealDiaryMsg.created })
})

const getMealDiaries = catchAsync(async (req, res) => {
  const mealDiaries = await mealDiaryService.getMealDiariesByType(req.body)
  sendSuccess({ res, data: mealDiaries, message: Message.mealDiaryMsg.success })
})

const updateMealDiaryById = catchAsync(async (req, res) => {
  await mealDiaryService.updateMealDiaryById(req.body)
  sendSuccess({ res, message: Message.mealDiaryMsg.success })
})

const deleteMealDiaryById = catchAsync(async (req, res) => {
  const { MealDiaryId } = req.params
  await mealDiaryService.deleteMealDiaryById(MealDiaryId)
  sendSuccess({ res, message: Message.mealDiaryMsg.success })
})

module.exports = {
    createMealDiary,
    getMealDiaries,
    updateMealDiaryById,
    deleteMealDiaryById,
}