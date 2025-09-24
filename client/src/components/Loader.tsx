import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useUserContext } from '../hooks/useUserContext'

export const Loader = () => {

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <Spinner animation={'border'} />
    </Container>
  )
}
