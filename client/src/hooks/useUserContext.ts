import { useContext } from 'react'
import {
  AppContext,
  type ContextType,
  type UserContextType,
} from '../components/AppContextProvider'

export const useUserContext = (): UserContextType => {
  const context = useContext<ContextType | undefined>(AppContext)

  if (!context) {
    throw new Error('useUserContext must be used within an AppContext Provider')
  }

  // Проверяем, что контекст соответствует UserContextType
  if ('user' in context) {
    return context as UserContextType
  }

  throw new Error('Context is not of type UserContextType')
}
