import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../store/actions/userActions'
import InputFieldAuth from '../form/InputFieldAuth'
import SubmitButton from '../form/SubmitButton'

function Login() {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const handleEmailInput = e => {
    setemail(e.target.value)
  }
  const handlePasswordInput = e => {
    setpassword(e.target.value)
  }
  const handleSubmitLogin = e => {
    e.preventDefault()
    login(email, password)(dispatch)
  }

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  return (
    <Container>
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
          <SubmitButton onClickSubmit={handleSubmitLogin} text='Login' />
        </Row>
      </Form>
    </Container>
  )
}

export default Login
