const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const { User, Basket } = require('../models/models')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

// бизнес логика
class UserService {
  async registration(email, password, roles) {
    // проверели есть ли пользователь с таким email
    const candidate = await User.findOne({ where: { email } })

    if (candidate !== null) {
      throw ApiError.badRequest('Пользователь с таким email уже существует')
    }

    // сделали пароль и сслыку на регистрацию
    const hashPassword = await bcrypt.hash(password, 5)
    const activationLink = uuid.v4()
    const user = await User.create({
      email,
      roles,
      password: hashPassword,
      activationLink,
    })

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    )

    const userDto = new UserDto(user) // id email isActivated roles
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    const bascet = await Basket.create({
      userId: user.id,
    })

    return {
      ...tokens
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } })

    if (!user) {
      throw ApiError.badRequest('Неккоректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw ApiError.badRequest('Неверное имя пользователя или пароль')
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      throw ApiError.badRequest('Неверное имя пользователя или пароль')
    }

    const userDto = new UserDto(user) // id email isActivated roles
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeRefreshToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDataBase = await tokenService.findToken(refreshToken)

    if (!tokenFromDataBase || !userData) {
      throw ApiError.unauthorizedError()
    }
    const user = await User.findOne({ where: { id: userData.id } })

    if (!user) {
      throw ApiError.unauthorizedError()
    }
    const userDto = new UserDto(user) // id email isActivated roles

    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens
    }
  }
}

module.exports = new UserService()
