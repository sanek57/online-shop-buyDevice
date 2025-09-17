import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TypeBar } from '../components/TypeBar'
import { BrandBar } from '../components/BrandBar'
import { DeviceList } from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'

export const Shop = observer(() => {
  const { devices } = useDeviceContext()

  useEffect(() => {
    fetchTypes().then(data => {
      devices.types = data
    })
    fetchBrands().then(data => {
      devices.brands = data
    })
    fetchDevices().then(data => {
      devices.devices = data
    })
  }, [])

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
        </Col>
      </Row>
    </Container>
  )
})
