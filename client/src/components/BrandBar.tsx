import { observer } from 'mobx-react-lite'
import React from 'react'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { Card, Col, Container, Row } from 'react-bootstrap'

export const BrandBar = observer(() => {
  const { devices } = useDeviceContext()

  return (
    <Container>
      <Row className='d-flex'>
        {devices.brands.map(brand => (
          <Col
            key={brand.id}
            style={{ cursor: 'pointer' }}
            xs={3}
            className='p-0'
            onClick={() => (devices.selectedBrand = brand)}
          >
            <Card
              className='p-2 ms-1 mt-1'
              border={
                brand.id === devices.selectedBrand?.id ? 'danger' : 'light'
              }
            >
              {brand.name}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
})
