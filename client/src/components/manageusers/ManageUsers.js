import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UsersList from './UsersList'

function ManageUsers() {
  const [usersList, setusersList] = useState(null)
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const config = () => ({
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })

  const deleteUser = async (userInfo, id) => {
    return await axios
      .delete(`http://localhost:5000/api/users/delete/${id}`, config())
      .then(res => res.data)
      .then(data => console.log('This is the message', data))
  }

  const getUsersList = async userInfo => {
    return await axios
      .get('http://localhost:5000/api/users/allusers', config())
      .then(res => res.data)
      .then(data => setusersList(data))
  }

  const handleDeleteUser = async (e, id) => {
    deleteUser(userInfo, id).then(() => getUsersList(userInfo))
  }

  useEffect(() => {
    getUsersList(userInfo)
  }, [])

  return (
    <div>
      <UsersList
        usersList={usersList}
        handleDeleteUser={handleDeleteUser}
      ></UsersList>
      {/* <UsersList usersList={usersList}></UsersList> */}
    </div>
  )
}

export default ManageUsers
