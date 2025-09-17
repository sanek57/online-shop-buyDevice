import type { AxiosError, AxiosResponse } from 'axios'
import type { Brand, Device, Type } from '../store/types'
import { $authHost, CustomError, type ErrorResponse } from '.'

export const createType = async (type: Type): Promise<Type> => {
  try {
    const { data } = await $authHost.post<Type>('api/type', type)

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const fetchTypes = async (): Promise<Type[]> => {
  try {
    const { data } = await $authHost.get<Type[]>('api/type')

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const createBrad = async (brand: Brand): Promise<Brand> => {
  try {
    const { data } = await $authHost.post<Brand>('api/brand', brand)

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const { data } = await $authHost.get<Brand[]>('api/brand')

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const createDevice = async (device: Device): Promise<Device> => {
  try {
    const { data } = await $authHost.post<Device>('api/device', device)

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const fetchDevices = async (): Promise<Device[]> => {
  try { 
    // тут еще сделано для пагинации
    const { data } = await $authHost.get<AxiosResponse>('api/device')

    return data.rows as Device[]
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const fetchOneDevice = async (id: string): Promise<Device> => {
  try {
    const { data } = await $authHost.get<Device>(`api/device/${id}`)

    return data
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}
