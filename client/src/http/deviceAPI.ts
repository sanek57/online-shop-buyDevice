import type { AxiosResponse } from 'axios'
import { $authHost } from '.'

export const createType = async <T>(type: T): Promise<AxiosResponse<T>> => {
  const response = await $authHost.post<T>('api/type', type)

  return response
}

export const fetchTypes = async <T>(): Promise<AxiosResponse<T>> => {
  const response = await $authHost.get<T>('api/type')

  return response
}

export const createBrand = async <T>(brand: T): Promise<AxiosResponse<T>> => {
  const response = await $authHost.post<T>('api/brand', brand)

  return response
}

export const fetchBrands = async <T>(): Promise<AxiosResponse<T>> => {
  const response = await $authHost.get<T>('api/brand')

  return response
}

export const createDevice = async <T>(
  device: FormData
): Promise<AxiosResponse<T>> => {
  const response = await $authHost.post<T>('api/device', device)

  return response
}

export const fetchDevices = async <T>(
  typeId: number | null,
  brandId: number | null,
  page: number,
  limit: number
): Promise<AxiosResponse<T>> => {
  // тут еще сделано для пагинации

  console.log(typeId, brandId, page, limit)

  const response = await $authHost.get<T>('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })

  return response
}

export const fetchOneDevice = async <T>(
  id: string
): Promise<AxiosResponse<T>> => {
  const response = await $authHost.get<T>(`api/device/${id}`)

  return response
}
