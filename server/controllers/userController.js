const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateToken = (id, email, roles) => {
  return jwt.sign(
    {
      id,
      email,
      roles,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h', // время жизни токена
    }
  )
}

class UserController {
  async registration(req, res, next) {
    const { email, password, roles } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest('Не задан email или пароль'))
    }

    const candidate = await User.findOne({ where: { email } })

    if (candidate !== null) {
      return next(
        ApiError.badRequest('Пользователь с таким email уже существует')
      )
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      email,
      roles,
      password: hashPassword,
    })

    const token = generateToken(user.id, user.email, user.roles)

    const bascet = await Basket.create({
      userId: user.id,
    })

    return res.json({ token })
  }
  async login(req, res, next) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.internal('Пользователь с таким именем не найден'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }

    const token = generateToken(user.id, user.email, user.roles)
    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateToken(req.user.id, req.user.email, req.user.roles)
    res.json({ token })
  }
}

module.exports = new UserController()
