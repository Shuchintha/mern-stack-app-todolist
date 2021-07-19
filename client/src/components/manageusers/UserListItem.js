import React from 'react'
import { Button } from 'react-bootstrap'
import ConfirmModal from '../modal/ConfirmModal'

function UserListItem({ index, user, handleDeleteUser, handleUserEdit }) {
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
      <tr>
        <td className='align-baseline col-1'>{index}</td>
        <td className='align-baseline col-4'>{user.email}</td>
        <td className='align-baseline col-3'>{user.name}</td>
        <td className='align-baseline col-2'>
          <Button
            variant='danger'
            className='btn-sm'
            onClick={() => setconfirmModalShow(true)}
          >
            Delete
          </Button>
        </td>
        <td className='align-baseline col-2'>
          {' '}
          <Button
            variant='dark'
            className='btn-sm'
            onClick={() => setuserEditModalShow(true)}
          >
            {user.isAdmin ? 'Admin' : 'User'}
          </Button>
        </td>
      </tr>

      <>
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
      </>
    </>
  )
}

export default UserListItem
