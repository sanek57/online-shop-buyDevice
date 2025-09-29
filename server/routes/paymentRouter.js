const { Router } = require('express')
const paymentController = require('../controllers/paymentController')
const authMiddelware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/pay', authMiddelware, paymentController.pay)
router.post('/notifications', paymentController.notification)

module.exports = router
