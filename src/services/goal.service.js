const _ = require('lodash')
const mongoose = require('mongoose')
const Goal = require('../models/goal.model')
const Message = require('../utils/Message')
const { status } = require('../utils/constant')
const pick = require('../utils/pick')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')

// create Goal
const createGoal = async (goalBody) => {
  // check exist
  const existedGoal = await Goal.findOne({
    userId: _.get(foodBody, 'userId'),
    status: {
        $ne: status.disabled
    }
  })

  const goal = pick(goalBody, [
    'userId',
    'currentGoal',
    'currentWeight',
  ])

  return Goal.create(goal)
}

// lấy mục tiêu
const getGoal = async (requestBody) => {
  const filter = {}
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled
    }
  }

  return Goal.find({ ...filter })
}

const updateGoalById = async (goalUpdateRequest) => {
  const goalId = _.get(goalUpdateRequest, 'goalId')
  const goalBody = pick(goalUpdateRequest, [
    'currentGoal',
    'currentWeight',
  ])
  const updateGoal = await Goal.findByIdAndUpdate(
    goalId, goalBody, { new: true }
  )
  throwBadRequest(!updateGoal, Message.goalMsg.notFound)
  return updateGoal
}

const deleteGoalById = async (goalId) => {
  const deleteGoal = await Goal.updateOne(
    { _id: goalId }, { status: status.disabled }
  )
  return deleteGoal
}

module.exports = {
  createGoal,
  getGoal,
  updateGoalById,
  deleteGoalById,
}