import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import ConfirmModal from '../modal/ConfirmModal'

function UserListItem({ user, handleDeleteUser, handleUserEdit }) {
  const [confirmModalShow, setconfirmModalShow] = React.useState(false)
  const [userEditModalShow, setuserEditModalShow] = React.useState(false)
  const confirmModalText = {
    title: 'Confirm User Delete',
    body: 'If you click delete, the user data will be deleted permanently.',
    saveBtnText: 'Delete',
  }
  const usertoAdminModalText = {
    title: 'Change status from User to Admin',
    body: 'Are you sure you want to give this user admin status.',
    saveBtnText: 'Add',
  }
  const admintoUserEditModalText = {
    title: 'Change status from Admin to User',
    body: 'Are you sure you want to remove this users admin status.',
    saveBtnText: 'Remove',
  }
  const handleDelete = () => {
    handleDeleteUser(user._id)
    setconfirmModalShow(false)
  }

  const handleAddAdmin = () => {
    handleUserEdit(user._id)
    setuserEditModalShow(false)
  }

  return (
    <>
      <Row>
        <Col sm={10}>
          <ListGroup.Item
            action
            className=' d-flex justify-content-between align-items-center'
            variant='light'
          >
            {user.email}
            {user.isAdmin && ` (Admin)`}
          </ListGroup.Item>
        </Col>
        <Col
          className=' d-flex justify-content-between align-items-center'
          sm={2}
        >
          <Button variant='danger' onClick={() => setconfirmModalShow(true)}>
            Delete
          </Button>{' '}
          <Button variant='dark' onClick={() => setuserEditModalShow(true)}>
            {user.isAdmin ? 'Admin' : 'User'}
          </Button>
        </Col>
      </Row>

      <div>
        <ConfirmModal
          show={confirmModalShow}
          onHide={() => setconfirmModalShow(false)}
          ModalText={confirmModalText}
          handleClick={handleDelete}
        />
        <ConfirmModal
          show={userEditModalShow}
          onHide={() => setuserEditModalShow(false)}
          ModalText={
            user.isAdmin ? admintoUserEditModalText : usertoAdminModalText
          }
          handleClick={handleAddAdmin}
        />
      </div>
    </>
  )
}

export default UserListItem
