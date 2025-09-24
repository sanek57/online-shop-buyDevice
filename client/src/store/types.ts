export interface User {
  id: number
  name: string
  email: string
  password: string
  isActivated?: boolean
  activationLink?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface AuthResponse {
  id: number
  accessToken: string
  refreshToken: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Type {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Brand {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface DescriptionDevice {
  id: number
  title: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Device {
  id: number
  name: string
  price: number
  rating: number
  img?: string
  info?: DescriptionDevice[] | string
  createdAt?: Date
  updatedAt?: Date
}
