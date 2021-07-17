import React from 'react'
import { ListGroup } from 'react-bootstrap'
import UserListItem from './UserListItem'

function UsersList({ usersList, handleDeleteUser, handleUserEdit }) {
  return (
    <ListGroup>
      <ListGroup.Item variant='success'>Users List</ListGroup.Item>
      {usersList &&
        usersList.map(user => {
          return (
            <UserListItem
              key={user.email}
              user={user}
              handleDeleteUser={handleDeleteUser}
              handleUserEdit={handleUserEdit}
            ></UserListItem>
          )
        })}
    </ListGroup>
  )
}

export default UsersList
