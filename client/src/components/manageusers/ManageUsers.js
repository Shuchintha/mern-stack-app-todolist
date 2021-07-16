import axios from 'axios'
import React, { useState, useEffect } from 'react'
import UsersList from './UsersList'
import { Accordion } from 'react-bootstrap'

const getUsersList = async () => {
  return await axios
    .get('http://localhost:5000/api/users/allusers')
    .then(res => res.data)
}

function ManageUsers() {
  const [usersList, setusersLsit] = useState(null)

  useEffect(() => {
    getUsersList().then(json => setusersLsit(json))

    console.log('usersLsit', JSON.stringify(usersList))
  }, [])

  return (
    <div>
      <Accordion defaultActiveKey='0' flush>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>'Create User'</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey='1'>
          <Accordion.Header>UsersList</Accordion.Header>
          <Accordion.Body>
            hello
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </div>
  )
}

export default ManageUsers
{
  /* <UsersList usersList={usersList}></UsersList> */
}
