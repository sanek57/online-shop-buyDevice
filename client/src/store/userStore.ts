import { makeAutoObservable } from 'mobx'
import type { User } from './types'

export default class UserStore {
  private _isAuth: boolean = false
  private _user: User

  constructor() {
    makeAutoObservable(this)
  }

  set isAuth(flag: boolean) {
    this._isAuth = flag
  }

  set user(user: User) {
    this._user = user
  }

  get isAuth(): boolean {
    return this._isAuth
  }

  get user(): User {
    return this._user
  }
}
