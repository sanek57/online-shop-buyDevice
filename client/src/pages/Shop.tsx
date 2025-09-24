import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TypeBar } from '../components/TypeBar'
import { BrandBar } from '../components/BrandBar'
import { DeviceList } from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import { Pages } from '../components/Pages'

export const Shop = observer(() => {
  const { devices } = useDeviceContext()

  useEffect(() => {
    fetchTypes().then(data => {
      devices.types = data
    })
    fetchBrands().then(data => {
      devices.brands = data
    })
    fetchDevices(null, null, 1, 2).then(data => {
      devices.devices = data.rows
      devices.totalCount = data.count
    })
  }, [])

  useEffect(() => {
    fetchDevices(
      devices.selectedType?.id,
      devices.selectedBrand?.id,
      devices.page,
      2
    ).then(data => {
      devices.devices = data.rows
      devices.totalCount = data.count
    })
  }, [devices.page, devices.selectedBrand, devices.selectedType])

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})
