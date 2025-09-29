import React, { useEffect, useState, type FC } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { useDeviceContext } from '../../hooks/useDeviceContext'
import type { DescriptionDevice } from '../../store/types'
import { observer } from 'mobx-react-lite'
import { CustomError } from '../../http'

export const CreateDevice: FC<{
  show: boolean | undefined
  onHide: () => void
}> = observer(({ show, onHide }) => {
  const { devices } = useDeviceContext()
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>()
  const [file, setFile] = useState<File>()
  const [info, setInfo] = useState<DescriptionDevice[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        await devices.fetchTypes()
        await devices.fetchBrands()
      } catch (e) {
        if (e instanceof CustomError) {
          alert(e.message)
        }
      }
    }
    getData()
  }, [])

  function addInfoHandler(): void {
    setInfo([...info, { title: '', description: '', id: Date.now() }])
  }

  function removeInfoHandler(id: number): void {
    setInfo(info.filter(i => i.id !== id))
  }

  const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const changeInfo = (key: string, value: string, id: number) => {
    setInfo(info.map(i => (i.id === id ? { ...i, [key]: value } : i)))
  }

  const addDeviceHandler = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file as Blob)
    formData.append('brandId', `${devices.selectedBrand.id}`)
    formData.append('typeId', `${devices.selectedType.id}`)
    formData.append('info', JSON.stringify(info))

    try {
      await devices.createDevice(formData)
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message)
      }
    } finally {
      onHide()
    }
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
            <Dropdown.Toggle>
              {devices.selectedType?.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.types.map(type => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => (devices.selectedType = type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>
              {devices.selectedBrand?.name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.brands.map(brand => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => (devices.selectedBrand = brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder='Введите название устройства'
            className='mt-3'
          />
          <Form.Control
            type='number'
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(+e.target.value)
            }
            placeholder='Введите стоимость устройства'
            className='mt-3'
          />
          <Form.Control
            type='file'
            className='mt-3'
            onChange={selectFileHandler}
          />
          <hr />
          <Button variant='outline-dark' onClick={addInfoHandler}>
            Добавить новое свойство
          </Button>
          {info.map(i => (
            <Row key={i.id} className='d-flex mt-2'>
              <Col md={5}>
                <Form.Control
                  placeholder='Введите название свойства'
                  value={i.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeInfo('title', e.target.value, i.id)
                  }
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  placeholder='Введите описание свойства'
                  value={i.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeInfo('description', e.target.value, i.id)
                  }
                />
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
        <Button variant={'outline-success'} onClick={addDeviceHandler}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})
