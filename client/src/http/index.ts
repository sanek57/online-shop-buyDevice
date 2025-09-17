import axios, { type InternalAxiosRequestConfig } from 'axios'

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
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

// отрабатывает перед каждым запросом
$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
