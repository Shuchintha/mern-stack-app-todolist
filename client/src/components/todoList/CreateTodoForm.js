import React from 'react'
import Form from 'react-bootstrap/Form'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function CreateTodoForm({
  inputTodo,
  handleInputChange,
  handleTodoInputTodo,
  inputBodyTodo,
  handleInputBodyChange,
}) {
  return (
    <>
      <Form onSubmit={handleTodoInputTodo}>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Title
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              value={inputTodo}
              onChange={handleInputChange}
              placeholder='Enter Title here...'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextPassword'>
          <Form.Label column sm='2'>
            Details
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              value={inputBodyTodo}
              onChange={handleInputBodyChange}
              placeholder='Enter Details here...'
            />
          </Col>
        </Form.Group>
        <Button variant='info' type='submit'>
          Create task
        </Button>
      </Form>
    </>
  )
}

export default CreateTodoForm
