import { makeAutoObservable } from 'mobx'
import type { Brand, Device, Type } from './types'

export default class DeviceStore {
  private _types: Type[] = []

  private _brands: Brand[] = []

  private _devices: Device[] = []

  private _selectedType: Type
  private _selectedBrand: Brand

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

  set selectedType(type: Type) {
    this._selectedType = type
  }

  get selectedType(): Type {
    return this._selectedType
  }

  set selectedBrand(brand: Brand) {
    this._selectedBrand = brand
  }

  get selectedBrand(): Brand {
    return this._selectedBrand
  }
}
