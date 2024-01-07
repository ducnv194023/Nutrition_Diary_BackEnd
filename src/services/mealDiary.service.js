const _ = require('lodash')
const MealDiary = require('../models/mealDiary.model')
const mongoose = require('mongoose')
const Message = require('../utils/Message')
const { status } = require('../utils/constant')
const pick = require('../utils/pick')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')

// create MealDiary
const createMealDiary = async (mealDiaryBody) => {
  // check exist

  const existedMealDiary = await MealDiary.findOne({
    foodId: _.get(mealDiaryBody, 'foodId'),
    diaryType: _.get(mealDiaryBody, 'diaryType'),
    status: {
      $ne: status.disabled
    }
  })

  throwBadRequest(existedMealDiary, Message.mealDiaryMsg.nameExisted)

  const mealDiary = pick(mealDiaryBody, [
    'userId',
    'foodId',
    'description',
    'diaryType'
  ])

  return MealDiary.create(mealDiary)
}

// lấy tất cả món ăn theo loại thực đơn 
const getMealDiariesByType = async (requestBody) => {
  console.log('11111')
  const filter = {}
  const userId = _.get(requestBody, 'userId')
  const diaryType = _.get(requestBody, 'diaryType')
  const date = _.get(requestBody, 'date')
  filter.createdAt = {
    $gte: new Date(date),
    $lt: new Date(date + 24 * 60 * 60 * 1000)
  }
  filter.diaryType = diaryType
  filter.userId = mongoose.Types.ObjectId(userId)
  console.log(filter)
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled
    }
  }

  return await MealDiary.aggregate([
    {
      $match: {
        ...filter,
      }
    },
    {
      $lookup: {
        from: "foods",
        localField: "foodId",
        foreignField: "_id",
        as: "foodInfo"
      }
    },
    {
      $unwind: "$foodInfo"
    },
    {
      $group: {
        _id: "$diaryType",
        totalCalories: { $sum: "$foodInfo.calories" },
        foods: { $push: "$foodInfo" }
      }
    }
  ])  
}

const updateMealDiaryById = async (mealDiaryUpdateRequest) => {
  const mealDiaryId = _.get(mealDiaryUpdateRequest, 'mealDiaryId')
  const mealDiaryBody = pick(mealDiaryUpdateRequest, [
    'foodId',
    'description',
    'diaryType'
  ])
  const updateMealDiary = await MealDiary.findByIdAndUpdate(
    mealDiaryId, mealDiaryBody, { new: true }
  )
  throwBadRequest(!updateMealDiary, Message.mealDiaryMsg.notFound)
  return updateMealDiary
}

const deleteMealDiaryById = async (mealDiaryId) => {
  const deleteMealDiary = await MealDiary.updateOne(
    { _id: mealDiaryId }, { status: status.disabled }
  )
  return deleteMealDiary
}

module.exports = {
  createMealDiary,
  getMealDiariesByType,
  updateMealDiaryById,
  deleteMealDiaryById,
}