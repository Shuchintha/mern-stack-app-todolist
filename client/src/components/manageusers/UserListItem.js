import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import ConfirmModal from '../modal/ConfirmModal'

function UserListItem({ user, handleDeleteUser, handleUserEdit }) {
  const [confirmModalShow, setconfirmModalShow] = React.useState(false)
  const [userEditModalShow, setuserEditModalShow] = React.useState(false)
  const confirmModalText = {
    title: 'Confirm User Delete',
    body: 'If you click delete, the user data will be deleted permanently.',
    saveBtnText: 'Delete',
  }
  const userEditModalText = {
    title: 'Confirm User as Admin',
    body: 'Are you sure you want to give this user admin status.',
    saveBtnText: 'Add',
  }
  const handleDelete = () => {
    handleDeleteUser(user._id)
  }

  const handleAddAdmin = () => {
    handleUserEdit(user._id)
  }

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
          <Button variant='danger' onClick={() => setconfirmModalShow(true)}>
            Delete
          </Button>{' '}
          {!user.isAdmin && (
            <Button variant='dark' onClick={() => setuserEditModalShow(true)}>
              Make Admin
            </Button>
          )}
          <ConfirmModal
            show={confirmModalShow}
            onHide={() => setconfirmModalShow(false)}
            ModalText={confirmModalText}
            handleClick={handleDelete}
          />
          <ConfirmModal
            show={userEditModalShow}
            onHide={() => setuserEditModalShow(false)}
            ModalText={userEditModalText}
            handleClick={handleAddAdmin}
          />
        </div>
      </ListGroup.Item>
    </>
  )
}

export default UserListItem
