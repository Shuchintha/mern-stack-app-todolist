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
import Message from '../form/Message'
import validator from 'validator'

function TodoLayout() {
  const history = useHistory()
  const [todoList, settodoList] = useState([])
  const [inputTodo, setinputTodo] = useState('')
  const [inputBodyTodo, setinputBodyTodo] = useState('')
  const [toggleView, setToggleView] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTodo, setEditTodo] = useState({})
  const [message, setmessage] = useState('')

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
    if (
      validator.isEmpty(inputTodo + '') ||
      validator.isEmpty(inputBodyTodo + '')
    ) {
      return setmessage('Title and the body of the task is required.')
    }

    const todo = {
      title: inputTodo,
      body: inputBodyTodo,
    }
    await axios
      .post('http://localhost:5000/api/todos/todoinput', todo, config())
      .then(response => response.data)

    getAllTodos()
    setinputTodo('')
    setinputBodyTodo('')
  }

  const handleDeleteTodo = async id => {
    await axios
      .delete(`http://localhost:5000/api/todos/delete/${id}`, config())
      .then(response => response.data)
    getAllTodos()
  }

  const handleEditTodo = todo => {
    setEditTodo(todo)
    handleModalShow()
  }

  const handleTodoDone = async id => {
    await axios
      .put(`http://localhost:5000/api/todos/tododoneupdate`, { id }, config())
      .then(response => response.data)
    getAllTodos()
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      getAllTodos()
    }
  }, [userInfo, history])

  return (
    <div>
      <Container style={{ width: '100%' }} fluid>
        {message && <Message variant='danger'>{message}</Message>}
        <Row
          className='d-flex justify-content-center '
          style={{ marginBottom: '4rem' }}
        >
          <Col
            className='text-center shadow p-3 rounded'
            sm={8}
            style={{ marginBottom: '.5rem' }}
          >
            <h2 className='shadow p-3 mb-3 bg-white rounded '>Create Todo:</h2>
            <CreateTodoForm
              inputTodo={inputTodo}
              handleInputChange={handleInputChange}
              handleTodoInputTodo={handleTodoInputTodo}
              inputBodyTodo={inputBodyTodo}
              handleInputBodyChange={handleInputBodyChange}
            />
          </Col>
        </Row>
        <Row className='d-flex justify-content-center shadow p-3 mb-2 rounded'>
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
        <Row className='d-flex justify-content-center shadow p-3 rounded'>
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
