const catchAsync = require('../utils/catchAsync')
const Message = require('../utils/Message')
const { sendSuccess } = require('../libs/response')
const goalService = require('../services/goal.service')

const createGoal = catchAsync(async (req, res) => {
  const newGoal = await goalService.createGoal(req.body)
  sendSuccess({ res, data: newGoal, message: Message.goalMsg.created })
})

const getGoal = catchAsync(async (req, res) => {
  const goal = await goalService.getGoal(req.body)
  sendSuccess({ res, data: goal, message: Message.goalMsg.success })
})

const updateGoalById = catchAsync(async (req, res) => {
  await goalService.updateGoalById(req.body)
  sendSuccess({ res, message: Message.goalMsg.success })
})

const deleteGoalById = catchAsync(async (req, res) => {
  const { goalId } = req.params
  await goalService.deleteGoalById(goalId)
  sendSuccess({ res, message: Message.goalMsg.success })
})

module.exports = {
    createGoal,
    getGoal,
    updateGoalById,
    deleteGoalById,
}