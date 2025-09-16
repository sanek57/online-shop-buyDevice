import React from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router'
import { REGISTRATION_ROUTE } from '../utils/consts'

export const Auth = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>Авторизация</h2>
        <Form className='d-flex flex-column'>
          <Form.Control className='mt-3' placeholder='Введите ваш email...' />
          <Form.Control className='mt-3' placeholder='Введите ваш пароль...' />
          <Row className='d-flex justify-content-between mt-3 ps-3 pe-3'>
            <div> 
              Еще нет аккаунта?{' '}
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
            </div>
            <Button variant={'outline-success'} className='mt-3 align-self-end'>
              Войти
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}
