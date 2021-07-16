import React from 'react'
import { Form } from 'react-bootstrap'

function InputFieldAuth({ controlId, label, type, placeholder, handleChange }) {
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

export default InputFieldAuth
