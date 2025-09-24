import { Route, Routes } from 'react-router'
import { authRoutes, publicRoutes } from '../routes'
import { Shop } from '../pages/Shop'
import { useUserContext } from '../hooks/useUserContext'
import { observer } from 'mobx-react-lite'
import { Loader } from './Loader'

export const AppRouter = observer(() => {
  const { user } = useUserContext()

  return (
    <>
      {user.loading && <Loader />}

      {!user.loading && (
        <Routes>
          {user.isAuth &&
            authRoutes.map(route => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.component />}
              />
            ))}
          {publicRoutes.map(route => (
            <Route path={route.path} element={<route.component />} />
          ))}

          <Route path='*' element={<Shop />} />
        </Routes>
      )}
    </>
  )
})
