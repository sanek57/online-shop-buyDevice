import React, { useState, type FC } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { useDeviceContext } from '../../hooks/useDeviceContext'
import type { DescriptionDevice } from '../../store/types'

export const CreateDevice: FC<{
  show: boolean | undefined
  onHide: () => void
}> = ({ show, onHide }) => {
  const { devices } = useDeviceContext()
  const [info, setInfo] = useState<DescriptionDevice[]>([])

  function addInfoHandler(): void {
    setInfo([...info, { title: '', description: '', id: Date.now() }])
  }

  function removeInfoHandler(id: number): void {
    setInfo(info.filter(i => i.id !== id))
  }

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.types.map(type => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.brands.map(brand => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            placeholder='Введите название устройства'
            className='mt-3'
          />
          <Form.Control
            type='number'
            placeholder='Введите стоимость устройства'
            className='mt-3'
          />
          <Form.Control type='file' className='mt-3' />
          <hr />
          <Button variant='outline-dark' onClick={addInfoHandler}>
            Добавить новое свойство
          </Button>
          {info.map(i => (
            <Row key={i.id} className='d-flex mt-2'>
              <Col md={5}>
                <Form.Control placeholder='Введите название свойства' />
              </Col>
              <Col md={5}>
                <Form.Control placeholder='Введите описание свойства' />
              </Col>
              <Col md={2} className='d-flex justify-content-end'>
                <Button
                  variant='outline-danger'
                  onClick={() => removeInfoHandler(i.id)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={'outline-success'} onClick={() => {}}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
