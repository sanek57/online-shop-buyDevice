import React, { useState, type FC } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createBrad } from '../../http/deviceAPI'
import { CustomError } from '../../http'
import type { Type } from '../../store/types'

export const CreateBrand: FC<{
  show: boolean | undefined
  onHide: () => void
}> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>('')

  const addBrandHandler = () => {
    createBrad({ name: value } as Type)
      .then(data => setValue(''))
      .catch(err => {
        if (err instanceof CustomError) {
          alert(err.message)
        }
      })
      .finally(() => onHide())
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
          Добавить новый бренд
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
        <Button variant={'outline-success'} onClick={addBrandHandler}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
