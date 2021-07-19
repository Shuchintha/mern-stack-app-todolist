import React from 'react'
import { Table } from 'react-bootstrap'
import UserListItem from './UserListItem'

function UsersList({ usersList, handleDeleteUser, handleUserEdit }) {
  return (
    <Table
      className='text-left align-baseline'
      striped
      bordered
      hover
      responsive='md'
    >
      <thead>
        <tr>
          <th>No.</th>
          <th>Email</th>
          <th>Name</th>
          <th>Remove User</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {usersList &&
          usersList.map((user, index) => {
            return (
              <UserListItem
                index={index}
                key={user.email}
                user={user}
                handleDeleteUser={handleDeleteUser}
                handleUserEdit={handleUserEdit}
              ></UserListItem>
            )
          })}
      </tbody>
    </Table>
  )
}

export default UsersList
