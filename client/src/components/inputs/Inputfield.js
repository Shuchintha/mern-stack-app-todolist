import React from 'react'
import { Form } from 'react-bootstrap'

function Inputfield() {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={e => handleChange(e)}
        type={type}
        placeholder={placeholder}
        required
      />
    </Form.Group>
  )
}

export default Inputfield
