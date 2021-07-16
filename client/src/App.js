import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import TodoLayout from './components/todoList/TodoLayout'
import PrivateRoute from './routerComponents/PrivateRoute'
import NavBar from './components/navBar/NavBar'
import './App.css'
import { Container } from 'react-bootstrap'
import ManageUsers from './components/manageusers/ManageUsers'

function App() {
  return (
    <Router>
      <NavBar />
      <Container className='mt-5'>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/todolists' component={TodoLayout}></PrivateRoute>
        <PrivateRoute path='/manageuser' component={ManageUsers}></PrivateRoute>
      </Container>
    </Router>
  )
}

export default App
