import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useLocation } from 'react-router'
import { useUserContext } from '../hooks/useUserContext'
import { observer } from 'mobx-react-lite'
import { CustomError } from '../http'

export const Auth = observer(() => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const checkHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await user.login(email, password)
      } else {
        await user.registration(email, password)
      }

      navigate(SHOP_ROUTE)
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message)
      }
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>Авторизация</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш email...'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш пароль...'
            value={password}
            type='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Container>
            <Row className='d-flex justify-content-between mt-3'>
              <Col
                sm={8}
                className='d-flex justify-content-start align-items-center'
              >
                {' '}
                {isLogin ? (
                  <div>
                    Нет аккаунта?{' '}
                    <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                  </div>
                ) : (
                  <div>
                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                  </div>
                )}
              </Col>
              <Col
                sm={4}
                className='d-flex justify-content-end align-items-center'
              >
                <Button
                  variant={'outline-success'}
                  onClick={e => checkHandler(e)}
                >
                  {isLogin ? 'Войти' : 'Регистрация'}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Card>
    </Container>
  )
})
