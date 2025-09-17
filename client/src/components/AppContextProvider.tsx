import React, { createContext } from 'react'
import UserStore from '../store/userStore'
import DeviceStore from '../store/deviceStore'

export interface UserContextType {
  user: UserStore
}

export interface DeviceContextType {
  devices: DeviceStore
}

export type ContextType = UserContextType | DeviceContextType

export const AppContext = createContext<ContextType | undefined>(undefined)

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AppContext.Provider
      value={{
        user: new UserStore(),
        devices: new DeviceStore(),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
