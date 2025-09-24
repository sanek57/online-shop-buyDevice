require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) // для работы с файлами

app.use('/api', router)

// замыкающий тк не пробрасывает дальше next()
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate() // подключаемся к бд
    await sequelize.sync() // сверяем состояние БД с моделями (схемами)

    app.listen(PORT, () => {
      console.log('Server was started on port', PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
