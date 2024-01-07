const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createUserExercise = Joi.object().keys({
  userId: Joi.required().custom(objectId),
  exerciseId: Joi.required().custom(objectId),
})

const createExercise = Joi.object().keys({
  name: Joi.string().required(),
  calories: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string(),
  exerciseTime: Joi.number().required(),
})

const getUserExercises = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId),
    date: Joi.number().required(),
  })
}
const updateExercise = {
  body: Joi.object().keys({
    exerciseId: Joi.required().custom(objectId),
    name: Joi.string().required(),
    calories: Joi.number().required(),
    description: Joi.string(),
    image: Joi.string(),
    exerciseTime: Joi.number().required(),
  })
}

module.exports = {
    createUserExercise,
    getUserExercises,
    createExercise,
    updateExercise,
}
