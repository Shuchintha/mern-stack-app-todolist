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
  useEffect(() => {
    console.log('object')
    if (!userInfo) {
      history.push('/login')
    } else {
      const getTodos = async () => {
        await axios
          .get('http://localhost:5000/api/todos', config())
          .then(response => response.data)
          .then(json => settodoList(prevState => json))
      }

      getTodos()
    }
  }, [history, userInfo])

  const handleInputChange = event => {
    setinputTodo(event.target.value)
  }

  const handleTodoInputTodo = async event => {
    event.preventDefault()
    const todo = {
      userId: 1,
      title: inputTodo,
      completed: false,
    }
    await axios.post('http://localhost:5000/api/todoinput', todo).then(todo => {
      settodoList(prevState => {
        return [...prevState, todo.data]
      })
    })
    setinputTodo('')
  }

  const handleClick = async id => {
    console.log(id)
    await axios
      .delete(`http://localhost:5000/api/tododelete/${id}`)
      .then(res => {
        settodoList(prevState => {
          return prevState.filter(todo => todo._id !== id)
        })
      })
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
