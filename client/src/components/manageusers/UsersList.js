import React from 'react'
import { ListGroup } from 'react-bootstrap'
import UserListItem from './UserListItem'

const variantList = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
]
function random_variant() {
  return variantList[Math.floor(Math.random() * variantList.length)]
}
function UsersList({ usersList }) {
  return (
    <ListGroup>
      <ListGroup.Item>No style</ListGroup.Item>

      {usersList &&
        usersList.map(user => {
          return (
            <UserListItem
              key={user.email}
              userEmail={user.email}
              variant={random_variant()}
            ></UserListItem>
          )
        })}
    </ListGroup>
  )
}

export default UsersList
