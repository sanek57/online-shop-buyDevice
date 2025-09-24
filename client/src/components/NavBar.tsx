import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { CustomError } from '../http'
import { getProtectedData } from '../http/userAPI'

export const NavBar = observer(() => {
  const { user } = useUserContext()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      navigate(LOGIN_ROUTE)
      await user.logout()
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message)
      }
    }
  }

  const getHandler = async () => {
    try {
      await getProtectedData()
    } catch (e) {
      if (e instanceof CustomError) {
        navigate(LOGIN_ROUTE)
        await user.logout()
        alert(e.message)
      }
    }
  }

  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <NavLink
          to={SHOP_ROUTE}
          style={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          BuyDevice
        </NavLink>
        {user.isAuth ? (
          <Nav className='ml-auto'>
            <Button variant={'outline-light'} onClick={getHandler}>
              Get protected data
            </Button>
            <Button
              variant={'outline-light'}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={'outline-light'}
              className='ms-2'
              onClick={logoutHandler}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Button
              variant={'outline-light'}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})
