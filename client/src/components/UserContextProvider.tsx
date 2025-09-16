import React, { createContext } from 'react'
import UserStore from '../store/userStore'
import DeviceStore from '../store/deviceStore'

export interface UserContextType {
  user: UserStore
  devices: DeviceStore
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <UserContext.Provider
      value={{
        user: new UserStore(),
        devices: new DeviceStore(),
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
