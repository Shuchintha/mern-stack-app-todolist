import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminCreateNewUser from './AdminCreateNewUser'
import UsersList from './UsersList'

function ManageUsers() {
  const [usersList, setusersList] = useState(null)
  const userInfo = useSelector(state => state.userLogin.userInfo)

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
    return await axios
      .get('http://localhost:5000/api/users/allusers', config())
      .then(res => res.data)
      .then(data => setusersList(data))
  }

  const updateUser = async id => {
    console.log('config:', JSON.stringify(config()))
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
    getUsersList()
  }, [])

  return (
    <div>
      <AdminCreateNewUser></AdminCreateNewUser>
      <UsersList
        usersList={usersList}
        handleDeleteUser={handleDeleteUser}
        handleUserEdit={handleUserEdit}
      ></UsersList>
    </div>
  )
}

export default ManageUsers
