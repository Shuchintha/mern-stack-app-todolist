import React from 'react'
import { ListGroup } from 'react-bootstrap'

function UserListItem({ userEmail, variant }) {
  return (
    <ListGroup.Item action variant={variant}>
      {userEmail}
    </ListGroup.Item>
  )
}

export default UserListItem
