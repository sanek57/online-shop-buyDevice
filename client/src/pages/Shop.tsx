import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TypeBar } from '../components/TypeBar'
import { BrandBar } from '../components/BrandBar'
import { DeviceList } from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { Pages } from '../components/Pages'
import { CustomError } from '../http'

export const Shop = observer(() => {
  const { devices } = useDeviceContext()

  useEffect(() => {
    const getData = async () => {
      try {
        await devices.fetchTypes()
        await devices.fetchBrands()

        await devices.fetchDevices(-1, -1, 1, 2)
      } catch (e) {
        if (e instanceof CustomError) {
          alert(e.message)
        }
      }
    }

    getData()
  }, [])

  useEffect(() => {
    const getDevices = async () => {
      try {
        await devices.fetchDevices()
      } catch (e) {
        if (e instanceof CustomError) {
          alert(e.message)
        }
      }
    }

    getDevices()
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
