import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaTh, FaThList } from 'react-icons/fa'
import CardViewComp from './CardViewComp'
import ListViewComp from './ListViewComp'
import CreateTodoForm from './CreateTodoForm'
import EditModalComp from './EditModalComp'

function TodoLayout() {
  const history = useHistory()
  const [todoList, settodoList] = useState([])
  const [inputTodo, setinputTodo] = useState('')
  const [inputBodyTodo, setinputBodyTodo] = useState('')
  const [toggleView, setToggleView] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTodo, setEditTodo] = useState({})

  const handleModalClose = () => setShowModal(false)
  const handleModalShow = () => setShowModal(pre => true)

  const userInfo = useSelector(state => state.userLogin.userInfo)

  const config = () => ({
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })

  const getAllTodos = async () => {
    await axios
      .get('http://localhost:5000/api/todos', config())
      .then(response => response.data)
      .then(json => settodoList(prevState => json.todos))
  }

  const handleInputChange = event => {
    setinputTodo(event.target.value)
  }
  const handleInputBodyChange = event => {
    setinputBodyTodo(event.target.value)
  }

  const handleTodoInputTodo = async event => {
    event.preventDefault()
    const todo = {
      title: inputTodo,
      body: inputBodyTodo,
    }
    await axios
      .post('http://localhost:5000/api/todos/todoinput', todo, config())
      .then(response => response.data)

      .then(todo => console.log(todo.message))
    getAllTodos()
    setinputTodo('')
    setinputBodyTodo('')
  }

  const handleDeleteTodo = async id => {
    await axios
      .delete(`http://localhost:5000/api/todos/delete/${id}`, config())
      .then(response => response.data)
      .then(data => console.log(data.message))
    getAllTodos()
  }

  const handleEditTodo = todo => {
    setEditTodo(todo)
    handleModalShow()

    console.log('todo', todo)
  }

  const handleTodoDone = async id => {
    await axios
      .put(`http://localhost:5000/api/todos/tododoneupdate`, { id }, config())
      .then(response => response.data)
      .then(data => console.log(data.message))
    getAllTodos()
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      getAllTodos()
    }
  }, [history, userInfo])

  return (
    <div>
      <Container style={{ width: '100%' }} fluid>
        <Row
          className='d-flex justify-content-center '
          style={{ height: '18rem' }}
        >
          <div
            className='d-block  w-100 text-center'
            style={{ height: '0.5rem' }}
          >
            <h1>Todo list:</h1>
          </div>
          <div
            className='d-block h-50 w-50 text-center '
            style={{ bottom: '1rem' }}
          >
            <CreateTodoForm
              inputTodo={inputTodo}
              handleInputChange={handleInputChange}
              handleTodoInputTodo={handleTodoInputTodo}
              inputBodyTodo={inputBodyTodo}
              handleInputBodyChange={handleInputBodyChange}
            />
          </div>
        </Row>
        <Row className='d-flex justify-content-center '>
          <Col className='text-left'>
            <h3> All tasks</h3>
          </Col>
          <Col className='text-right'>
            <Button
              className='mb-2'
              variant='dark'
              onClick={e => setToggleView(!toggleView)}
            >
              {toggleView ? <FaThList /> : <FaTh />}
            </Button>
          </Col>
        </Row>
        <Row>
          {Array.isArray(todoList) && todoList.length > 0
            ? todoList?.map(todo =>
                toggleView ? (
                  <CardViewComp
                    key={todo._id}
                    todo={todo}
                    handleDelete={handleDeleteTodo}
                    handleEdit={handleEditTodo}
                    handleDone={handleTodoDone}
                  />
                ) : (
                  <ListViewComp
                    key={todo._id}
                    todo={todo}
                    handleDelete={handleDeleteTodo}
                    handleEdit={handleEditTodo}
                    handleDone={handleTodoDone}
                  />
                )
              )
            : null}
          <EditModalComp
            todo={editTodo}
            show={showModal}
            handleClose={handleModalClose}
            getAllTodos={getAllTodos}
            config={config}
          />
        </Row>
      </Container>
    </div>
  )
}

export default TodoLayout
