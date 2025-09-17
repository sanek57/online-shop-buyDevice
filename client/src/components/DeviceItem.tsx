import React, { type FC } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import type { Device } from '../store/types'
import RatingLogo from '../assets/img/rating.png'
import { useNavigate } from 'react-router'
import { DEVICE_ROUTE } from '../utils/consts'

export const DeviceItem: FC<{ device: Device }> = ({ device }) => {
  const navigate = useNavigate()

  return (
    <Col
      md={3}
      className='mt-3'
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image
          width={150}
          height={150}
          src={import.meta.env.VITE_API_URL + device?.img}
          alt='image not found...'
        />
        <div className='d-flex justify-content-between align-items-center mt-1 text-black-50'>
          <div>Samsung...</div>
          <div className='d-flex align-items-center'>
            {device.rating}
            <Image src={RatingLogo} width={16} height={16} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
}
