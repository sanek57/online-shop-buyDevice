import { BrowserRouter } from 'react-router'
import { AppRouter } from './components/AppRouter'
import { UserContextProvider } from './components/UserContextProvider'
import { NavBar } from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <NavBar />
        <AppRouter />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
