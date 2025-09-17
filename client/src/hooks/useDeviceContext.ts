import { useContext } from 'react'
import {
  AppContext,
  type ContextType,
  type DeviceContextType,
} from '../components/AppContextProvider'

export const useDeviceContext = (): DeviceContextType => {
  const context = useContext<ContextType | undefined>(AppContext)

  if (!context) {
    throw new Error(
      'useDeviceContext must be used within an AppContext Provider'
    )
  }

  // Проверяем, что контекст соответствует DeviceContextType
  if ('devices' in context) {
    return context as DeviceContextType
  }

  throw new Error('Context is not of type DeviceContextType')
}
