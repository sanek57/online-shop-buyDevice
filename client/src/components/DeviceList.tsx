import React from 'react'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap'
import { DeviceItem } from './DeviceItem'

export const DeviceList = observer(() => {
  const { devices } = useDeviceContext()
  return (
    <Row className='d-flex'>
      {devices.devices.map(device => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  )
})
