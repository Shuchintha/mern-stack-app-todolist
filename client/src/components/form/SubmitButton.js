import React from 'react'
import { Button } from 'react-bootstrap'

function SubmitButton({ text, onClickSubmit }) {
  return (
    <Button onClick={e => onClickSubmit(e)} size='lg' type='submit'>
      {text}
    </Button>
  )
}

export default SubmitButton
