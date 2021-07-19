import React, { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../../store/actions/userActions'
import FormContainer from '../form/FormContainer'
import InputFieldAuth from '../form/InputFieldAuth'
import Loader from '../form/Loader'
import Message from '../form/Message'
import SubmitButton from '../form/SubmitButton'

function Login() {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const handleEmailInput = e => {
    setemail(e.target.value)
  }
  const handlePasswordInput = e => {
    setpassword(e.target.value)
  }
  const handleSubmitLogin = e => {
    e.preventDefault()
    if (!email) {
      setMessage('Email Address is required.')
    } else if (!password) {
      setMessage('Password should be entered properly.')
    } else {
      login(email, password)(dispatch)
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  return (
    <FormContainer>
      <h2 className='text-center m-5'>Login User</h2>
      {message && <Message variant='danger'>{message}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form>
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
        <Row className='justify-content-center'>
          New Customer? <Link to='/register'>Register</Link>
        </Row>
        <Row className='justify-content-center'>
          <Row>
            <SubmitButton onClickSubmit={handleSubmitLogin} text='Login' />
          </Row>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default Login
