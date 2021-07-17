import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

function TodoLayout() {
  const history = useHistory()
  const [todoList, settodoList] = useState([])
  const [inputTodo, setinputTodo] = useState('')
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
  useEffect(() => {
    console.log('object')
    if (!userInfo) {
      history.push('/login')
    } else {
      getAllTodos()
    }
  }, [history, userInfo])

  const handleInputChange = event => {
    setinputTodo(event.target.value)
  }

  const handleTodoInputTodo = async event => {
    event.preventDefault()
    const todo = {
      title: inputTodo,
      body: inputTodo,
    }
    await axios
      .post('http://localhost:5000/api/todos/todoinput', todo, config())
      .then(response => response.data)

      .then(todo => console.log(todo.message))
    getAllTodos()
    setinputTodo('')
  }

  const handleClick = async id => {
    await axios
      .delete(`http://localhost:5000/api/todos/delete/${id}`, config())
      .then(response => response.data)
      .then(data => console.log(data.message))
    getAllTodos()
  }

  return (
    <div>
      <h1>Todo list:</h1>
      {todoList
        ? todoList.map(todo => (
            <div key={todo._id}>
              {todo.title}
              <button onClick={() => handleClick(todo._id)}>X</button>
            </div>
          ))
        : ''}
      <form onSubmit={handleTodoInputTodo}>
        <label htmlFor='Todo inputTodo'>Todo :</label>
        <input type='text' value={inputTodo} onChange={handleInputChange} />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default TodoLayout
