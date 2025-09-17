import { observer } from 'mobx-react-lite'
import React from 'react'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { ListGroup } from 'react-bootstrap'

export const TypeBar = observer(() => {
  const { devices } = useDeviceContext()

  return (
    <ListGroup>
      {devices.types.map(type => (
        <ListGroup.Item
        style={{cursor: 'pointer'}}
          key={type.id}
          active={type.id === devices.selectedType?.id}
          onClick={() => (devices.selectedType = type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
})
