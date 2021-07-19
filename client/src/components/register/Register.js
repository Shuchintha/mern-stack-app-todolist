import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import InputFieldAuth from '../form/InputFieldAuth'
import SubmitButton from '../form/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import Message from '../form/Message'
import Loader from '../form/Loader'
function Register() {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

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
    if (!firstName || !lastName) {
      setMessage('First name and Last name is required.')
    } else if (!email) {
      setMessage('Email Address is required.')
    } else if (!password || !confirmPassword || password !== confirmPassword) {
      setMessage('Password should be entered properly.')
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
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
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
        <Row className='justify-content-center'>
          Already registered? <Link to='/login'>Login</Link>
        </Row>
        <Row className='justify-content-center'>
          <SubmitButton onClickSubmit={handleSubmitSignUp} text='Sign Up' />
        </Row>
      </Form>
    </Container>
  )
}

export default Register
