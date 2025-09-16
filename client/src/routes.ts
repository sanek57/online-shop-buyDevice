import type React from 'react'
import { Admin } from './pages/Admin'
import { Basket } from './pages/Basket'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  type AUTH_ROUTE,
  type NO_AUTH_ROUTE,
} from './utils/consts'
import type { JSX } from 'react'
import { DevicePage } from './pages/DevicePage'
import { Auth } from './pages/Auth'
import { Shop } from './pages/Shop'

interface Route<T> {
  path: T
  component: () => JSX.Element
}

export const authRoutes: Route<AUTH_ROUTE>[] = [
  {
    path: ADMIN_ROUTE,
    component: Admin,
  },
  {
    path: BASKET_ROUTE,
    component: Basket,
  },
]

export const publicRoutes: Route<NO_AUTH_ROUTE>[] = [
  {
    path: SHOP_ROUTE,
    component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id' as NO_AUTH_ROUTE,
    component: DevicePage,
  },
]
