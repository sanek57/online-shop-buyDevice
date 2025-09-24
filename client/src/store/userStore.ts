import { makeAutoObservable } from 'mobx'
import { type AuthResponse, type User } from './types'
import { login, logout, registration } from '../http/userAPI'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import { CustomError, type ErrorResponse } from '../http'
import { jwtDecode } from 'jwt-decode'

export default class UserStore {
  private _isAuth: boolean = false
  private _user: User | null = {} as User
  private _isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  set isAuth(flag: boolean) {
    this._isAuth = flag
  }

  set user(user: User | null) {
    this._user = user
  }

  get isAuth(): boolean {
    return this._isAuth
  }

  get user(): User | null {
    return this._user
  }

  get loading(): boolean {
    return this._isLoading
  }

  set loading(loading: boolean) {
    this._isLoading = loading
  }

  async sleep() {
    return new Promise(res => setTimeout(res, 500))
  }

  async login(email: string, password: string) {
    this.loading = true
    await this.sleep()

    try {
      const response = await login(email, password)

      localStorage.setItem('token', response.data.accessToken)

      this.user = jwtDecode(response.data.accessToken)
      this.isAuth = true
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async registration(email: string, password: string) {
    this.loading = true
    await this.sleep()

    try {
      const response = await registration(email, password)

      localStorage.setItem('token', response.data.accessToken)

      this.user = jwtDecode(response.data.accessToken)
      this.isAuth = true
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async logout() {
    this.loading = true
    await this.sleep()

    try {
      const response = await logout()

      localStorage.removeItem('token')

      this.user = {} as User
      this.isAuth = false
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }

  async checkAuth() {
    this.loading = true
    await this.sleep()

    try {
      const response = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_API_URL}api/user/refresh`,
        {
          withCredentials: true, // включаем cookie в запрос
        }
      )

      console.log(response)

      localStorage.setItem('token', response.data.accessToken)

      this.user = jwtDecode(response.data.accessToken)
      this.isAuth = true
    } catch (e) {
      const { response } = e as AxiosError
      const { data } = response as AxiosResponse<ErrorResponse>

      throw new CustomError(data.message)
    } finally {
      this.loading = false
    }
  }
}
