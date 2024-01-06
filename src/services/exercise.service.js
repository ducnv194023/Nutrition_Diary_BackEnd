const _ = require('lodash')
const Exercise = require('../models/exercise.model')
const Message = require('../utils/Message')
const { status } = require('../utils/constant')
const pick = require('../utils/pick')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')

// create exercise
const createExercise = async (exerciseBody) => {
  // check exist

  const existedExercise = await Exercise.findOne({
    name: _.get(exerciseBody, 'name'),
    status: {
      $ne: status.disabled
    }
  })

  throwBadRequest(existedExercise, Message.exerciseMsg.nameExisted)

  const exercise = pick(exerciseBody, [
    'name',
    'description',
    'image',
    'calories',
    'exerciseTime'
  ])

  return Exercise.create(exercise)
}

// lấy tất cả bài tập
const getExercises = async (requestBody) => {
  const filter = {}
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled
    }
  }

  return Exercise.find({ ...filter })
}

const updateExerciseById = async (exerciseUpdateRequest) => {
  const exerciseId = _.get(exerciseUpdateRequest, 'exerciseId')
  const exerciseBody = pick(exerciseUpdateRequest, [
    'name',
    'description',
    'image',
    'calories',
    'exerciseTime'
  ])
  const updateExercise = await Exercise.findByIdAndUpdate(
    exerciseId, exerciseBody, { new: true }
  )
  throwBadRequest(!updateExercise, Message.exerciseMsg.notFound)
  return updateExercise
}

const deleteExerciseById = async (exerciseId) => {
  const deleteExercise = await Exercise.updateOne(
    { _id: exerciseId }, { status: status.disabled }
  )
  return deleteExercise
}

module.exports = {
  createExercise,
  getExercises,
  updateExerciseById,
  deleteExerciseById,
}