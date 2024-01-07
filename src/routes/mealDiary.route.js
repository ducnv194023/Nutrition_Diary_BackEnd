const { Router } = require('express')
const mealDiaryController = require('../controllers/mealDiary.controller')
const mealDiaryValidation = require('../validation/mealDiary.validation')
const auth = require('../middlewares/verifyToken')
const validate = require('../middlewares/validate')

const router = Router()

// Thêm một món ăn vào thực đơn của bữa ăn
router.route('/').post(auth, validate(mealDiaryValidation.createMealDiary), mealDiaryController.createMealDiary)

// Lấy ra tất cả món ăn theo thực đơn
router.route('/getMealDiariesByType').post(auth, validate(mealDiaryValidation.getMealDiaries), mealDiaryController.getMealDiaries)

router.route('/:mealDiaryId')
// Cập nhật món ăn
  .patch(auth, validate(mealDiaryValidation.updateMealDiary), mealDiaryController.updateMealDiaryById)
// Xóa một món ăn
  .delete(auth, mealDiaryController.deleteMealDiaryById)

module.exports = router