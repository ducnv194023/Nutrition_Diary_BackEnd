const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createFood = Joi.object().keys({
  userId: Joi.required().custom(objectId),
  name: Joi.string().required(),
  calories: Joi.number().required(),
  description: Joi.string(),
  brand: Joi.string(),
  image: Joi.string(),
  cholesterol: Joi.number(),
  protein: Joi.number(),
  sodium: Joi.number(),
  fat: Joi.number(),
  carbohydrate: Joi.number(),
  fiber: Joi.number(),
  sugar: Joi.number(),
  saturatedFat: Joi.number(),
})

const getFoods = Joi.object().keys({
  userId: Joi.required().custom(objectId),
})

const updateFood = {
  body: Joi.object().keys({
    foodId: Joi.required().custom(objectId),
    name: Joi.string().required(),
    calories: Joi.number().required(),
    description: Joi.string(),
    brand: Joi.string(),
    image: Joi.string(),
    cholesterol: Joi.number(),
    protein: Joi.number(),
    sodium: Joi.number(),
    fat: Joi.number(),
    carbohydrate: Joi.number(),
    fiber: Joi.number(),
    sugar: Joi.number(),
    saturatedFat: Joi.number(),
  })
}

module.exports = {
  createFood,
  getFoods,
  updateFood,
}
