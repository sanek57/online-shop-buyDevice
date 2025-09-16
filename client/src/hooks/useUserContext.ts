import { useContext } from 'react'
import {
  UserContext,
  type UserContextType,
} from '../components/UserContextProvider'

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)

  return context
}
