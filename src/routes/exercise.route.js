const { Router } = require('express')
const exerciseController = require('../controllers/exercise.controller')
const exerciseValidation = require('../validation/exercise.validation')
const auth = require('../middlewares/verifyToken')
const validate = require('../middlewares/validate')

const router = Router()

// Thêm một bài tập
router.route('/').post(auth, validate(exerciseValidation.createExercise), exerciseController.createExercise)

router.route('/user').post(auth, validate(exerciseValidation.createUserExercise), exerciseController.createUserExercise)

router.route('/getUserExercises').post(auth, validate(exerciseValidation.getUserExercises), exerciseController.getUserExercises)

// Lấy ra tất cả bài tập
router.route('/').get(auth, exerciseController.getExercises)

router.route('/:exerciseId')
// Cập nhật món ăn
  .patch(auth, validate(exerciseValidation.updateExercise), exerciseController.updateExerciseById)
// Xóa một món ăn
  .delete(auth, exerciseController.deleteExerciseById)

module.exports = router