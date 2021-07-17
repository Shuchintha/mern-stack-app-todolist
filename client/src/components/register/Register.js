import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Alert } from 'react-bootstrap'
import InputFieldAuth from '../form/InputFieldAuth'
import SubmitButton from '../form/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/actions/userActions'
import { useHistory } from 'react-router'

function Register() {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errorMessage, seterrorMessage] = useState(null)
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const dispatch = useDispatch()

  const handleEmailInput = e => {
    setemail(e.target.value)
  }
  const handlePasswordInput = e => {
    setpassword(e.target.value)
  }
  const handleConfirmPasswordInput = e => {
    setconfirmPassword(e.target.value)
  }
  const handleFirstNameInput = e => {
    setfirstName(e.target.value)
  }
  const handleLastNameInput = e => {
    setlastName(e.target.value)
  }
  const handleSubmitSignUp = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      seterrorMessage('Password are not matching.')
    } else {
      register(firstName, lastName, email, password)(dispatch)
    }
  }
  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  return (
    <Container>
      <h2 className='text-center mb-4'>Register User</h2>
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
          <Col sm lg='6'>
            <InputFieldAuth
              controlId='formPassword'
              label='Password'
              type='password'
              placeholder='Password'
              handleChange={handlePasswordInput}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col sm lg='6'>
            <InputFieldAuth
              controlId='formConfirmPassword'
              label='ConfirmPassword'
              type='password'
              placeholder='Confirm Password'
              handleChange={handleConfirmPasswordInput}
            />
          </Col>
        </Row>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

        <Row className='justify-content-center'>
          <SubmitButton onClickSubmit={handleSubmitSignUp} text='Sign Up' />
        </Row>
      </Form>
    </Container>
  )
}

export default Register
