const { Router } = require('express')
const foodController = require('../controllers/food.controller')
const foodValidation = require('../validation/food.validation')
const auth = require('../middlewares/verifyToken')
const validate = require('../middlewares/validate')

const router = Router()

// Thêm một món ăn
router.route('/').post(auth, validate(foodValidation.createFood), foodController.createFood)

// Lấy ra tất cả món ăn
router.route('/').get(auth, validate(foodValidation.getFoods), foodController.getFoods)

router.route('/:foodId')
// Cập nhật món ăn
  .patch(auth, validate(foodValidation.updateFood), foodController.updateFoodById)
// Xóa một món ăn
  .delete(auth, foodController.deleteFoodById)

module.exports = router