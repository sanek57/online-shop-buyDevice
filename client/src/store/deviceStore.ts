import { makeAutoObservable } from 'mobx'
import type { Brand, Device, Type } from './types'

export default class DeviceStore {
  private _types: Type[] = [
    { id: 1, name: 'Холодильник' },
    { id: 2, name: 'Смартфон' },
  ]

  private _brands: Brand[] = [
    { id: 1, name: 'Samsung' },
    { id: 2, name: 'Apple' },
  ]

  private _devices: Device[] = [
    { id: 1, name: 'Iphone 12', price: 25000, rating: 5 },
    { id: 2, name: 'Iphone 13', price: 25000, rating: 5 },
    { id: 1, name: 'Iphone 14', price: 25000, rating: 5 },
  ]

  constructor() {
    makeAutoObservable(this)
  }

  set types(types: Type[]) {
    this._types = types
  }

  set brands(brands: Brand[]) {
    this._brands = brands
  }

  set devices(devices: Device[]) {
    this._devices = devices
  }

  get types(): Type[] {
    return this._types
  }

  get brands(): Brand[] {
    return this._brands
  }

  get devices(): Device[] {
    return this._devices
  }
}
