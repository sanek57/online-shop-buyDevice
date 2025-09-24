import React, { createContext, useMemo } from 'react'
import UserStore from '../store/userStore'
import DeviceStore from '../store/deviceStore'

export interface UserContextType {
  user: UserStore
}

export interface DeviceContextType {
  devices: DeviceStore
}

export type ContextType = UserContextType | DeviceContextType

export const AppContext = createContext<ContextType | null>(null)

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const userStore = useMemo(() => new UserStore(), [])
  const deiveStore = useMemo(() => new DeviceStore(), [])

  return (
    <AppContext.Provider
      value={{
        user: userStore,
        devices: deiveStore,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
