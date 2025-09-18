const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { log, error } = require('console')

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body // info - [deviceInfo]
      const { img } = req.files

      const fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })

      if (info) {
        info = JSON.parse(info) // парсим тк данне из formData приходят в строке
        info.forEach(i => {
          // await не ставим намеренно - пускай создаются где то асинхронно
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        })
      }

      res.status(200).json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query

    page = page || 1
    limit = limit || 9

    let offset = page * limit - limit // сдвиг от начала показа

    let devices

    // findAndCountAll - предназначена для пагинации
    // найдет все и посчитает общее количество {col: number, row: [{}]}

    try {
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset })
      }

      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: {
            brandId,
          },
          limit,
          offset,
        })
      }

      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: {
            typeId,
          },
          limit,
          offset,
        })
      }

      if (brandId && typeId) {
        console.log(brandId, typeId)
        devices = await Device.findAndCountAll({
          where: {
            brandId,
            typeId,
          },
          limit,
          offset,
        })
      }

      return res.status(200).json(devices)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getOne(req, res) {
    const { id } = req.params

    const device = await Device.findOne({
      where: {
        id,
      },
      include: [{ model: DeviceInfo, as: 'info' }],
    })
    return res.status(200).json(device)
  }
}

module.exports = new DeviceController()
