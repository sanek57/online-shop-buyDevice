export interface User {
  id: number
  name: string
  email: string
  password: string
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

export interface Device {
  id: number
  name: string
  price: number
  rating: number
  img?: string
  createdAt?: Date
  updatedAt?: Date
}
