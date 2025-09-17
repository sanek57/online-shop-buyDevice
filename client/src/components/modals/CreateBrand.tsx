import React, { type FC } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const CreateBrand: FC<{
  show: boolean | undefined
  onHide: () => void
}> = ({ show, onHide }) => {
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
          <Form.Control placeholder='Введите название типа' />
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
