const { Router } = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddelware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddelware, userController.check)

module.exports = router
