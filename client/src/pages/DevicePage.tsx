import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import StarLogo from '../assets/img/Star.png'
import { useParams } from 'react-router'
import type { Device } from '../store/types'
import { CustomError } from '../http'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { useUserContext } from '../hooks/useUserContext'
import { observer } from 'mobx-react-lite'
import { Loader } from '../components/Loader'

export const DevicePage = observer(() => {
  const [device, setDevice] = useState<Device>()
  const { id } = useParams()
  const { devices } = useDeviceContext()
  const { user } = useUserContext()

  useEffect(() => {
    const getDevice = async () => {
      try {
        const device = await devices.fetchDeviceByid(id)
        setDevice(device)
      } catch (e) {
        if (e instanceof CustomError) {
          alert(e.message)
        } else {
          alert(e)
        }
      }
    }

    getDevice()
  }, [])

  const buyNowHandler = async () => {
    try {
      if (device) {
        await devices.buyNow(user.user?.id, device.id, device.price)
      }
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message)
      }
    }
  }

  if (devices.loading) return <Loader />

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image
            width={400}
            height={300}
            src={import.meta.env.VITE_API_URL + device?.img}
            alt='imgage not loading...'
          />
        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center'>
            <h2 className='text-center'>{device?.name}</h2>
            <div
              className='d-flex justify-content-center align-items-center'
              style={{
                background: `url(${StarLogo}) center center no-repeat`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {device?.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>{device?.price} руб.</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
            <Button variant='success' size='lg' onClick={buyNowHandler}>
              Купить сейчас
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column mt-3'>
        <h1>Характеристики:</h1>
        {device?.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
})
