import React, { useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import InputFieldAuth from '../form/InputFieldAuth'
import SubmitButton from '../form/SubmitButton'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Message from '../form/Message'
import Loader from '../form/Loader'

function AdminCreateNewUser({ getUsersList, usersList }) {
  const [email, setemail] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [message, setmessage] = useState('')
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const config = () => ({
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
  const createUser = async (firstName, lastName, email) => {
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
    if (!firstName || !lastName) {
      setmessage('First name and Last name is required.')
    } else if (!email) {
      setmessage('Email is invalid.')
    } else if (usersList.some(user => user.email === email)) {
      setmessage('User already exists.')
    } else {
      createUser(firstName, lastName, email)
    }
  }
  return (
    <Container className='border rounded border-light p-3 mb-1'>
      {message && <Message variant='danger'>{message}</Message>}
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

        <Row className='justify-content-center'>
          <SubmitButton onClickSubmit={handleSubmitAddUser} text='Add User' />
        </Row>
      </Form>
    </Container>
  )
}

export default AdminCreateNewUser
