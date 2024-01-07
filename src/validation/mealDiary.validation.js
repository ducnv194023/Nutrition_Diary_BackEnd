const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createMealDiary = Joi.object().keys({
  userId: Joi.required().custom(objectId),
  foodId: Joi.required().custom(objectId),
  description: Joi.string(),
  diaryType: Joi.string().required(),
})

const getMealDiaries = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId),
    date: Joi.number().required(),
    diaryType: Joi.string().required(),
  })
}
const updateMealDiary = {
  body: Joi.object().keys({
    mealDiaryId: Joi.required().custom(objectId),
    foodId: Joi.required().custom(objectId),
    description: Joi.string(),
    diaryType: Joi.string().required(),
  })
}

module.exports = {
    createMealDiary,
    getMealDiaries,
    updateMealDiary,
}
