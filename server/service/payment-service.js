const ApiError = require('../error/ApiError')
const { YooCheckout } = require('@a2seven/yoo-checkout')
const uuid = require('uuid')

class PaymentService {
  constructor() {
    this.YooKassa = new YooCheckout({
      shopId: process.env.SHOP_ID,
      secretKey: process.env.SHOP_SECRET_KEY,
    })
    
  }

  async createPayment(createPayload) {
    // защита от дублирования платежа в течении 24 часов
    const idempotenceKey = uuid.v4()

    const payment = await this.YooKassa.createPayment(
      createPayload,
      idempotenceKey
    )

    if(!payment) {
        throw ApiError.failedPayment('Платеж не прошел!')
    }

    // сохранить id платежа в БД - чтобы потом можно было получить данные по API провайдера кассы

    return payment
  }
}

module.exports = new PaymentService()

// createPayment - создать платеж
// getPaymentList - список платежей
// cancelPayment - отменить платеж
// getPayment - получить инфо о платеже по ID
// capturePayment - подтвердить платеж

// createRefund - создание возврата платежа
// getRefund - инфор о возврате
// getRefundList - список возвратов

// createReceipt - создание чека
// getReceipt - инфо о чеке