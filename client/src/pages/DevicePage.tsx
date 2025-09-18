import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import StarLogo from '../assets/img/Star.png'
import { data, useParams } from 'react-router'
import { fetchOneDevice } from '../http/deviceAPI'
import type { Device } from '../store/types'

export const DevicePage = () => {
  const [device, setDevice] = useState<Device>()
  const { id } = useParams()

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

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
}
