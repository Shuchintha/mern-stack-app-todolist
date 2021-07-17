import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

function UserListItem({ user, handleDeleteUser }) {
  return (
    <>
      <ListGroup.Item
        action
        className=' d-flex justify-content-between align-items-center'
        variant='light'
      >
        {user.email}
        {user.isAdmin && ` (Admin)`}
        <div>
          <Button variant='danger' onClick={e => handleDeleteUser(e, user._id)}>
            Delete
          </Button>{' '}
          <Button variant='dark'>Edit</Button>
        </div>
      </ListGroup.Item>
    </>
  )
}

export default UserListItem
