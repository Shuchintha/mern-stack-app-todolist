import React, { useState } from 'react'
import { Form, Container, Row, Col, Alert } from 'react-bootstrap'
import InputFieldAuth from '../form/InputFieldAuth'
import SubmitButton from '../form/SubmitButton'
import { useSelector } from 'react-redux'
import axios from 'axios'

function AdminCreateNewUser({ getUsersList }) {
  const [email, setemail] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const config = () => ({
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
  const createUser = async (firstName, lastName, email) => {
    console.log('config:', JSON.stringify(config()))
    return await axios
      .post(
        'http://localhost:5000/api/users/createuser',
        { firstName, lastName, email },
        config()
      )
      .then(res => res.data)
      .then(data => getUsersList())
  }

  const handleEmailInput = e => {
    setemail(e.target.value)
  }
  const handleFirstNameInput = e => {
    setfirstName(e.target.value)
  }
  const handleLastNameInput = e => {
    setlastName(e.target.value)
  }
  const handleSubmitAddUser = e => {
    e.preventDefault()
    createUser(firstName, lastName, email)
  }
  return (
    <Container className='border border-dark'>
      <h2 className='text-center'>Create a new User.</h2>
      <Form>
        <Row className='justify-content-md-center'>
          <Col sm lg='3'>
            <InputFieldAuth
              controlId='formFirstName'
              label='FirstName'
              type='text'
              placeholder='FirstName'
              handleChange={handleFirstNameInput}
            />
          </Col>
          <Col sm lg='3'>
            <InputFieldAuth
              controlId='formLastName'
              label='LastName'
              type='text'
              placeholder='LastName'
              handleChange={handleLastNameInput}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col sm lg='6'>
            <InputFieldAuth
              controlId='formEmail'
              label='Email'
              type='email'
              placeholder='Enter email'
              handleChange={handleEmailInput}
            />
          </Col>
        </Row>

        <Row className='justify-content-md-center'>
          <SubmitButton onClickSubmit={handleSubmitAddUser} text='Add User' />
        </Row>
      </Form>
    </Container>
  )
}

export default AdminCreateNewUser
