import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/actions/userActions'
import { useHistory } from 'react-router-dom'

function NavBar() {
  const history = useHistory()
  const userInfo = useSelector(state => state.userLogin.userInfo)
  const [user, setuser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      setuser(userInfo)
    }
  }, [user, userInfo])

  const handleLogout = e => {
    e.preventDefault()
    logout(dispatch)
    setuser(null)
    history.push('/login')
  }

  return (
    <>
      <Navbar sticky='top' bg='light'>
        <Nav className='mr-auto'>
          <LinkContainer to='/'>
            <Navbar.Brand variant='primary'>TodoApp</Navbar.Brand>
          </LinkContainer>
        </Nav>

        {user ? (
          <Nav>
            {user?.isAdmin && (
              <LinkContainer to='/manageuser'>
                <Nav.Link>Manage Users</Nav.Link>
              </LinkContainer>
            )}
            <NavDropdown
              title={` ${user?.isAdmin ? 'Admin' : 'Hi!'} ${user.name}`}
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <LinkContainer to='/register'>
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
      </Navbar>
    </>
  )
}

export default NavBar
