import { makeAutoObservable } from 'mobx'
import type { Brand, Device, DeviceResponse, Type } from './types'
import { buyNow } from '../http/paymentAPI'
import type { AxiosError, AxiosResponse } from 'axios'
import { CustomError, type ErrorResponse } from '../http'
import {
  createBrand,
  createDevice,
  createType,
  fetchBrands,
  fetchDevices,
  fetchOneDevice,
  fetchTypes,
} from '../http/deviceAPI'

export default class DeviceStore {
  private _types: Type[] = []
  private _brands: Brand[] = []
  private _devices: Device[] = []

  private _selectedType: Type = {} as Type
  private _selectedBrand: Brand = {} as Brand
  private _page: number = 1
  private _totalCount: number = 0
  private _limit: number = 2
  private _loading: boolean = false

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

  get loading(): boolean {
    return this._loading
  }

  set loading(loading: boolean) {
    this._loading = loading
  }

  async sleep() {
    return new Promise(res => setTimeout(res, 200))
  }

  async fetchDevices(
    typeId: number = -1,
    brandId: number = -1,
    page: number = -1,
    limit: number = -1
  ) {
    this.loading = true
    await this.sleep()
    try {
      const response = await fetchDevices<DeviceResponse>(
        typeId && this._selectedType.id,
        brandId && this.selectedBrand.id,
        page && this.page,
        limit && this.limit
      )
      this.devices = response.data.rows
      this.totalCount = response.data.count
    } catch (e) {
      const { response } = e as AxiosError

      const { data } = response as AxiosResponse<ErrorResponse>
      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async fetchDeviceByid(id: string) {
    this.loading = true
    await this.sleep()
    try {
      const response = await fetchOneDevice<Device>(id)

      return response.data
      return
    } catch (e) {
      const { response } = e as AxiosError

      const { data } = response as AxiosResponse<ErrorResponse>
      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async fetchTypes() {
    this.loading = true
    await this.sleep()

    try {
      const response = await fetchTypes<Type[]>()

      this.types = response.data
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async fetchBrands() {
    this.loading = true
    await this.sleep()

    try {
      const response = await fetchBrands<Brand[]>()

      this.brands = response.data
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async createType(type: Type) {
    this.loading = true
    await this.sleep()

    try {
      await createType<Type>(type)
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async createBrand(brand: Brand) {
    this.loading = true
    await this.sleep()

    try {
      await createBrand<Brand>(brand)
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async createDevice(device: FormData) {
    this.loading = true
    await this.sleep()

    try {
      await createDevice<Device>(device)
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async buyNow(userId: number, deviceId: string, value: string) {
    this.loading = true
    await this.sleep()

    try {
      const response = await buyNow(userId, deviceId, value)
      // console.log(response)

      // уходим на форму оплаты
      window.open(response?.data?.paymentInfo?.confirmation?.confirmation_url)
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }
}
