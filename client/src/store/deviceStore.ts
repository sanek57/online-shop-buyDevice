import { makeAutoObservable } from 'mobx'
import type { Brand, Device, Type } from './types'

export default class DeviceStore {
  private _types: Type[] = []
  private _brands: Brand[] = []
  private _devices: Device[] = []

  private _selectedType: Type = {} as Type
  private _selectedBrand: Brand = {} as Brand
  private _page: number = 1
  private _totalCount: number = 0
  private _limit: number = 3

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
    this._page = 1
    this._selectedType = type
  }

  get selectedType(): Type {
    return this._selectedType
  }

  set selectedBrand(brand: Brand) {
    this._page = 1
    this._selectedBrand = brand
  }

  get selectedBrand(): Brand {
    return this._selectedBrand
  }

  set page(page: number) {
    this._page = page
  }

  get page(): number {
    return this._page
  }

  set totalCount(totalCount: number) {
    this._totalCount = totalCount
  }

  get totalCount(): number {
    return this._totalCount
  }

  set limit(limit: number) {
    this._limit = limit
  }

  get limit(): number {
    return this._limit
  }
}
