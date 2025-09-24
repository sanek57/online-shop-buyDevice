const { Router } = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddelware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
)
router.get('/activate/:link', userController.activate)

router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get('/refresh', userController.refresh)

router.get('/protectedData', authMiddelware, userController.getProtectedData)

module.exports = router
