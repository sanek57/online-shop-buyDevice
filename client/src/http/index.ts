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
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
})

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

// отрабатывает перед каждым запросом
$authHost.interceptors.request.use(requestInterceptor)

// Refresh logic: This function will be called when a 401 response is received
const refreshAuthLogic = async (failedRequest: AxiosError) => {
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
    localStorage.removeItem('token')
    // redirect the user to the login page here
    return Promise.reject(error)
  }
}

// Instantiate the interceptor
createAuthRefreshInterceptor($authHost, refreshAuthLogic, {
  statusCodes: [401],
})

// отрабатывает перед каждым ответом - неподходит для реализации когда много запросов с истекшим токеном - будут спамить сервак
// $authHost.interceptors.response.use(
//   (config: AxiosResponse) => config,
//   async (error: AxiosError) => {
//     // отрабатывает когда произошла ошибка

//     // status 200 - nothing to do

//     // status 401 - unauthorized - refresh token
//     // 1. отправляем запрос на сервер для получения нового токена
//     // 2. сохряняем новый токен в localStorage
//     // 3. отправляем исходный запрос с новым токеном
//     const originalRequest = error.config
//     if (error.response?.status === 401 && !error.config?._isRetry) {
//       originalRequest._isRetry = true
//       try {
//         const response = await axios.get<AuthResponse>(
//           `${import.meta.env.VITE_API_URL}api/user/refresh`,
//           {
//             withCredentials: true, // включаем cookie в запрос
//           }
//         )
//         localStorage.setItem('token', response.data.accessToken)
//         return $authHost.request(originalRequest)
//       } catch (e) {
//         console.log('Не авторизован!!!')
//       }
//     }
//     throw error
//   }
// )

export { $host, $authHost }
