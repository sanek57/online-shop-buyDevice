const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const autHeader = req.headers.authorization

    if (!autHeader) {
      return next(ApiError.unauthorizedError())
    }

    const accessToken = autHeader.split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!accessToken) {
      return next(ApiError.unauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.unauthorizedError())
    }

    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.unauthorizedError())
  }
}
