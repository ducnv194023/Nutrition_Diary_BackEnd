const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createGoal = Joi.object().keys({
  userId: Joi.required().custom(objectId),
  currentGoal: Joi.number().required(),
  currentWeight: Joi.number().required(),
})

const getGoal = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  })
}

const updateGoal = {
  body: Joi.object().keys({
    goalId: Joi.required().custom(objectId),
    currentGoal: Joi.number().required(),
    currentWeight: Joi.number().required(),
  })
}

module.exports = {
    createGoal,
    getGoal,
    updateGoal,
}
