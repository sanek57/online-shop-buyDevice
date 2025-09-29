const jwt = require('jsonwebtoken')
const tokenService = require('../service/token-service')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' })
      }

      const decoded = tokenService.validateAccessToken(token)

      if (decoded.roles !== roles) {
        return res.status(403).json({ message: 'Нет доступа' })
      }
      req.user = decoded
      next()
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' })
    }
  }
}
