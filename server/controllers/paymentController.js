const e = require('express')
const paymentService = require('../service/payment-service')

class PaymentController {
  async pay(req, res, next) {
    try {
      const { value, orderId, userId } = req.body

      const createPayload = {
        // сколько / валюта
        amount: {
          value,
          currency: 'RUB',
        },
        // capture: true, // отключить подтверждение платеже
        // способ оплаты
        payment_method_data: {
          type: 'bank_card',
        },
        // способ подтверждения
        confirmation: {
          type: 'redirect',
          return_url: process.env.CLIENT_URL_PUB,
        },
        // все что требуется для оплаты или сохранить
        metadata: {
          orderId,
          userId,
        },
      }

      const paymentInfo = await paymentService.createPayment(createPayload)

      return res.status(200).json({ paymentInfo })
    } catch (e) {
      next(e)
    }
  }

  // ловит уведомления от YooKassa
  async notification(req, res, next) {
    // какая то логика по работе с данными и отправке ответа пользовтелю
    // сохранение информации о платеже в БД
    try {
      console.log(req.body) // данные о статусе подтверждения платежа
      return res.json({ status: 'OK', id: req.body.object.id })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PaymentController()
