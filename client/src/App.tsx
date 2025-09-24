import { BrowserRouter } from 'react-router'
import { AppRouter } from './components/AppRouter'
import { observer } from 'mobx-react-lite'
import { useUserContext } from './hooks/useUserContext'
import { useEffect } from 'react'
import { NavBar } from './components/NavBar'
import { CustomError } from './http'

const App = observer(() => {
  const { user } = useUserContext()

  useEffect(() => {
    const check = async () => {
      if (localStorage.getItem('token')) {
        try {
          user.checkAuth()
        } catch (e) {
          console.log(123, e)
          if (e instanceof CustomError) {
            alert(e.message)
          }
        }
      }
    }
    check()
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
