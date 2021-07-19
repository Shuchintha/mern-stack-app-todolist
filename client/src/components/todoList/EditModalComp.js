import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

function EditModalComp({ todo, show, handleClose, getAllTodos, config }) {
  const [title, setTitle] = useState(todo.title)
  const [body, setBody] = useState(todo.body)

  const handleSave = async () => {
    const newTitle = title || todo.title
    const newBody = body || todo.body
    await axios
      .put(
        `http://localhost:5000/api/todos/edit/${todo._id}`,
        { title: newTitle, body: newBody },
        config()
      )
      .then(response => response.data)
      .then(data => {
        console.log(data.message)
      })
    handleModalClose()
    getAllTodos()
  }

  const handleModalClose = () => {
    setTitle('')
    setBody('')
    handleClose()
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Edit task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Title
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                defaultValue={title || todo.title}
                onChange={event => setTitle(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className='mb-3'
            controlId='formPlaintextPassword'
          >
            <Form.Label column sm='2'>
              Details
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                defaultValue={body || todo.body}
                onChange={event => setBody(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleModalClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModalComp
