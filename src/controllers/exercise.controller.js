const catchAsync = require('../utils/catchAsync')
const Message = require('../utils/Message')
const { sendSuccess } = require('../libs/response')
const exerciseService = require('../services/exercise.service')

const createExercise = catchAsync(async (req, res) => {
  const newExercise = await exerciseService.createExercise(req.body)
  sendSuccess({ res, data: newExercise, message: Message.exerciseMsg.created })
})

const getExercises = catchAsync(async (req, res) => {
  const exercises = await exerciseService.getExercises(req.body)
  sendSuccess({ res, data: exercises, message: Message.exerciseMsg.success })
})

const updateExerciseById = catchAsync(async (req, res) => {
  await exerciseService.updateExerciseById(req.body)
  sendSuccess({ res, message: Message.exerciseMsg.success })
})

const deleteExerciseById = catchAsync(async (req, res) => {
  const { exerciseId } = req.params
  await exerciseService.deleteExerciseById(exerciseId)
  sendSuccess({ res, message: Message.exerciseMsg.success })
})

module.exports = {
    createExercise,
    getExercises,
    updateExerciseById,
    deleteExerciseById,
}