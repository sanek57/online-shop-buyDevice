const sequelize = require('../db')

const { DataTypes } = require('sequelize')

// внешние ключи sequelize добавит сам в том момент когда мы указываем hasMany belongsTo ....
// внешние ключи добавляются автоматически

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  roles: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// описываем связи между моделями
// получается такая двусторонная связь

// свзяь 1 к 1
User.hasOne(Basket)
Basket.belongsTo(User) // backet - прнадлежит user
// -------

//связь 1 к многим
User.hasMany(Rating)
Rating.belongsTo(User)

// -------
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

// -------
Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

// -------
Device.hasMany(DeviceInfo, { as: 'info' }) // device можнт иметь много device_info (составные части описания какого то устройства)
DeviceInfo.belongsTo(Device) // device_info принадлежит device

// -------
// связь много ко многим
// при установке связи много ко многим формируется промежуточная таблица
//  через through указываем какая таблица будет хранить связи (промежуточная)
Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  DeviceInfo,
  Brand,
  Type,
  Rating,
  TypeBrand,
}
