const { Router } = require('express')
const router = Router()
const AuthRouter = require('./auth.route')
const FoodRouter = require('./food.route')
const ExerciseRouter = require('./exercise.route')

router.use('/auth', AuthRouter)
router.use('/food', FoodRouter)
router.use('/exercise', ExerciseRouter)

module.exports = router
