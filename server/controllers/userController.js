const ApiError = require('../error/ApiError')
const userService = require('../service/user-service')
const { validationResult } = require('express-validator')

// контроллер
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        console.log(errors)
        return next(ApiError.badRequest('Ошибка валидации', errors))
      }

      const { email, password, roles } = req.body

      if (!email || !password) {
        return next(ApiError.badRequest('Не задан email или пароль'))
      }

      const userData = await userService.registration(email, password, roles)

      // чтобы работало не забыть подключить middleware - cookieparser()
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Защищаем от XSS
        secure: false, // Для localhost используем false, в продакшене true (HTTPS)
        sameSite: 'strict', // Защита от CSRF
        path: '/',
      })

      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const userData = await userService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Защищаем от XSS
        secure: false, // Для localhost используем false, в продакшене true (HTTPS)
        sameSite: 'strict', // Защита от CSRF
        path: '/',
      })

      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      // получаем refreshToken из cookie и удаляем ее из ответа
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')

      res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      console.log(activationLink)
      await userService.activate(activationLink)

      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      // получаем refreshToken из cookie
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Защищаем от XSS
        secure: false, // Для localhost используем false, в продакшене true (HTTPS)
        sameSite: 'strict', // Защита от CSRF
        path: '/',
      })

      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getProtectedData(req, res, next) {
    try {
      // const someData = someService.getSomeData()
      // return res.json(someData)

      return res.status(200).json({ message: 'protectedData', user: req.user })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
