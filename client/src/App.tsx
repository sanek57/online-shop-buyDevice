import { BrowserRouter } from 'react-router'
import { AppRouter } from './components/AppRouter'
import { observer } from 'mobx-react-lite'
import { useUserContext } from './hooks/useUserContext'
import { useEffect, useState } from 'react'
import { check } from './http/userAPI'
import { NavBar } from './components/NavBar'
import { Spinner } from 'react-bootstrap'
import { CustomError } from './http'

const delay = (ms: number, callback: () => void) =>
  new Promise(res => setTimeout(() => callback(), ms))

const App = observer(() => {
  const { user } = useUserContext()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function checked() {
      try {
        const response = await check()
        user.user = response
        user.isAuth = true
      } catch (e) {
        if (e instanceof CustomError) {
          // invalid token!!!
        }
      } finally {
        setLoading(false)
      }
    }

    delay(1000, checked)
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
