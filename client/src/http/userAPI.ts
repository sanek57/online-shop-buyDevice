import type { AxiosError, AxiosResponse } from 'axios'
import { $authHost, CustomError, type ErrorResponse } from '.'
import type { AuthResponse } from '../store/types'

export const registration = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await $authHost.post<AuthResponse>('api/user/registration', {
    email,
    password,
    roles: 'ADMIN',
  })

  console.log('registration', response)

  return response
}

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await $authHost.post<AuthResponse>(
    'api/user/login',
    {
      email,
      password,
    }
  )

  console.log('login', response)

  return response
}

export const logout = async (): Promise<void> => {
  const response = await $authHost.post('api/user/logout')

  console.log('logout', response)
}

export const getProtectedData = async (): Promise<void> => {
  try {
    const { data } = await $authHost.get<AxiosResponse>(
      'api/user/protectedData'
    )

    console.log(data)
  } catch (e) {
    const { response } = e as AxiosError
    const { data } = response as AxiosResponse<ErrorResponse>
    throw new CustomError(data.message)
  }
}
