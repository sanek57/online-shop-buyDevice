import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios'
import type { AuthResponse } from '../store/types'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export interface ErrorResponse {
  message: string
}
export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}
const $host = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
})

const $authHost = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}`,
  baseURL: `${import.meta.env.VITE_PUBLIC_URL_CLOUD_PUB}`,
  withCredentials: true,
})

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

// отрабатывает перед каждым запросом
$authHost.interceptors.request.use(requestInterceptor)

// status 401 - unauthorized - refresh token
// 1. отправляем запрос на сервер для получения нового токена
// 2. сохряняем новый токен в localStorage
// 3. отправляем исходный запрос с новым токеном
// Refresh logic: This function will be called when a 401 response is received
const refreshAccessLogic = async (failedRequest: AxiosError) => {
  try {
    const response = await axios.get<AuthResponse>(
      `${import.meta.env.VITE_API_URL}api/user/refresh`,
      {
        withCredentials: true, // включаем cookie в запрос - refreshToken
      }
    )

    localStorage.setItem('token', response.data.accessToken)

    // Update the authorization header for the failed request
    failedRequest.response.config.headers[
      'Authorization'
    ] = `Bearer ${response.data.accessToken}`

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

// Instantiate the interceptor
createAuthRefreshInterceptor($authHost, refreshAccessLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true, // Пауза других запросов во время обновления, чтобы избежать циклов
})

export { $host, $authHost }
