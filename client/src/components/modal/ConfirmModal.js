import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function ConfirmModal({ show, onHide, ModalText, handleClick }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title variant='danger' id='contained-modal-title-vcenter'>
          {ModalText.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{ModalText.body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='danger' onClick={() => handleClick()}>
          {ModalText.saveBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
