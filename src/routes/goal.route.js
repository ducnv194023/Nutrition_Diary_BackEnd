const { Router } = require('express')
const goalController = require('../controllers/goal.controller')
const goalValidation = require('../validation/goal.validation')
const auth = require('../middlewares/verifyToken')
const validate = require('../middlewares/validate')

const router = Router()

// Thêm mục tiêu
router.route('/').post(auth, validate(goalValidation.createGoal), goalController.createGoal)


// Lấy ra mục tiêu
router.route('/getGoal').post(auth, validate(goalValidation.getGoal), goalController.getGoal)

router.route('/:goalId')
// Cập nhật mục tiêu
  .patch(auth, validate(goalValidation.updateGoal), goalController.updateGoalById)
// Xóa mục tiêu
  .delete(auth, goalController.deleteGoalById)

module.exports = router