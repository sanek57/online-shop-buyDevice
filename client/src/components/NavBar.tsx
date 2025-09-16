import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router'
import { SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'

export const NavBar = observer(() => {
  const { user } = useUserContext()
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
            <Button variant={'outline-light'}>Админ панель</Button>
            <Button variant={'outline-light'} className="ms-2">
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Button
              variant={'outline-light'}
              onClick={() => {
                user.isAuth = true
              }}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})
