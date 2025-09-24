const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')
const { where } = require('sequelize')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: '30m', // время жизни токена
    })

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: '30d', // время жизни токена
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

  // на одного пользователя 1 токен - если зайдем с другого устройства,
  // то на страром устройстве токен анулируется
  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await Token.create({ userId: userId, refreshToken })
    return token
  }

  async removeRefreshToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } })

    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } })

    return tokenData
  }
}

module.exports = new TokenService()
