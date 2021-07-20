import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import AdminCreateNewUser from './AdminCreateNewUser'
import UsersList from './UsersList'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { openCreateUSer } from '../../store/actions/userActions'

function ManageUsers() {
  const [usersList, setusersList] = useState(null)
  const userInfo = useSelector(state => state.userLogin.userInfo)
  const { isShowCreateUser } = useSelector(state => state.uiUpdate)
  const dispatch = useDispatch()
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
  }

  const getUsersList = async () => {
    return await axios
      .get('http://localhost:5000/api/users/allusers', config())
      .then(res => res.data)
      .then(data => setusersList(data))
  }

  const updateUser = async id => {
    return await axios
      .put(`http://localhost:5000/api/users/update`, { id: id }, config())
      .then(res => res.data)
  }

  const handleDeleteUser = async id => {
    await deleteUser(id).then(() => getUsersList())
  }

  const handleUserEdit = async id => {
    await updateUser(id).then(() => getUsersList())
  }
  const handleUserAddOpen = () => {
    openCreateUSer(dispatch)
  }

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/')
    }
    getUsersList()
  }, [userInfo, history])

  return (
    <Container>
      {isShowCreateUser && (
        <Row
          className='d-flex justify-content-center '
          style={{ marginBottom: '1rem', marginTop: '-1rem' }}
        >
          <Col sm={8} className='shadow p-3 mb-4 bg-white rounded '>
            <h2 className='text--creatuser'>Create a new User.</h2>
            <AdminCreateNewUser
              usersList={usersList}
              getUsersList={getUsersList}
            ></AdminCreateNewUser>
          </Col>
        </Row>
      )}
      <Row>
        <Col className='text-center shadow p-3 mb-4 bg-white rounded'>
          <div className='text-center d-flex justify-content-between  shadow p-3 mb-4 bg-white rounded'>
            <div>{''}</div>
            <h2>User Details:</h2>
            <div>
              <AiOutlineUserAdd onClick={handleUserAddOpen} size={30} />
            </div>
          </div>
          <UsersList
            usersList={usersList}
            handleDeleteUser={handleDeleteUser}
            handleUserEdit={handleUserEdit}
          ></UsersList>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Row className=' shadow p-3 mb-4 bg-white rounded'>
            <h2 className='text-center'>User Details:</h2>
          </Row>
          <Row className=' shadow p-3 mb-4 bg-white rounded '>
            <UsersList
              usersList={usersList}
              handleDeleteUser={handleDeleteUser}
              handleUserEdit={handleUserEdit}
            ></UsersList>
          </Row>
        </Col>
      </Row> */}
    </Container>
  )
}

export default ManageUsers
