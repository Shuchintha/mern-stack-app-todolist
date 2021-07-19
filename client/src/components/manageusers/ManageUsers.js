import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import AdminCreateNewUser from './AdminCreateNewUser'
import UsersList from './UsersList'

function ManageUsers() {
  const [usersList, setusersList] = useState(null)
  const userInfo = useSelector(state => state.userLogin.userInfo)
  const history = useHistory()
  const config = () => ({
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })

  const deleteUser = async id => {
    return await axios
      .delete(`http://localhost:5000/api/users/delete/${id}`, config())
      .then(res => res.data)
      .then(data => console.log('This is the message', data))
  }

  const getUsersList = async () => {
    console.log('userInfo getuserlist', userInfo)
    return await axios
      .get('http://localhost:5000/api/users/allusers', config())
      .then(res => res.data)
      .then(data => setusersList(data))
  }

  const updateUser = async id => {
    return await axios
      .put(`http://localhost:5000/api/users/update`, { id: id }, config())
      .then(res => res.data)
      .then(data => console.log('This is the message', data))
  }

  const handleDeleteUser = async id => {
    await deleteUser(id).then(() => getUsersList())
  }

  const handleUserEdit = async id => {
    await updateUser(id).then(() => getUsersList())
  }

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/')
    }
    getUsersList()
  }, [])

  return (
    <Container>
      <Row style={{ marginBottom: '1rem', marginTop: '-1rem' }}>
        <Col>
          <h2 className='text-center'>Create a new User.</h2>

          <AdminCreateNewUser
            usersList={usersList}
            getUsersList={getUsersList}
          ></AdminCreateNewUser>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className='text-center'>User Details:</h2>

          <UsersList
            usersList={usersList}
            handleDeleteUser={handleDeleteUser}
            handleUserEdit={handleUserEdit}
          ></UsersList>
        </Col>
      </Row>
    </Container>
  )
}

export default ManageUsers
