import React, { useState, type FC } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { CustomError } from '../../http'
import type { Type } from '../../store/types'
import { useDeviceContext } from '../../hooks/useDeviceContext'

export const CreateType: FC<{
  show: boolean | undefined
  onHide: () => void
}> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>('')
  const { devices } = useDeviceContext()

  const addTypeHandler = async () => {
    try {
      await devices.createType({ name: value } as Type)
      setValue('')
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
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            placeholder='Введите название типа'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={'outline-success'} onClick={addTypeHandler}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
