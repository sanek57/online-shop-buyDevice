import type { AxiosError, AxiosResponse } from 'axios'
import { $authHost, $host, CustomError, type ErrorResponse } from '.'
import { jwtDecode } from 'jwt-decode'
import type { User } from '../store/types'

export const registration = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const { data } = await $host.post<string>('api/user/registration', {
      email,
      password,
      roles: 'ADMIN',
    })

    localStorage.setItem('token', data?.token)

    return jwtDecode(data?.token) as User
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>

    throw new CustomError(data.message)
  }
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const { data } = await $host.post<string>('api/user/login', {
      email,
      password,
    })

    localStorage.setItem('token', data?.token)

    return jwtDecode(data?.token) as User
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>
    throw new CustomError(data.message)
  }
}

// при обновлении страницы проверяем валидность токена
export const check = async (): Promise<User> => {
  try {
    const { data } = await $authHost.get<string>('api/user/auth')

    return jwtDecode(data?.token) as User
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>
    throw new CustomError(data.message)
  }
}
