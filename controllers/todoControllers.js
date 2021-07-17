import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { Todo } from '../models/todoModal.js'

import dotenv from 'dotenv'

dotenv.config()

const getAllTodos = asyncHandler(async (req, res) => {
  // console.log('get all todos -  req.user', req.user)
  const userId = req.user._id
  const todosList = await Todo.findOne({ userId })
  // console.log('get all todos -  user', todosList)

  if (todosList) {
    res.json(todosList)
  } else if (!todosList) {
    const todo = await Todo.create({
      userId: userId,
      todos: [],
    })
    res.json(todo)
  }
})

const postTodoItem = asyncHandler(async (req, res) => {
  const userId = req.user._id
  console.log('posttodos', req.body)

  const todosList = await Todo.findOne({ userId })

  await todosList.todos.push(req.body)
  const newtodo = todosList.todos[todosList.todos.length - 1]
  if (newtodo.isNew) {
    todosList.save()
    res.json({ message: 'Todo added.' })
  } else {
    res.status(400)
  }
})

const deleteTodoItem = asyncHandler(async (req, res) => {
  console.log('deletetodo', req.params.id)

  const todo = await Todo.findOne({ userId: req.user._id })
  console.log('deletetodo', todo)
  const todoDeleted = todo.todos.id(req.params.id).remove()

  if (todoDeleted) {
    todo.save()
    res.json({ message: 'Todo removed' })
  } else {
    res.status(404)
    throw new Error('Todo not found')
  }
})

export { getAllTodos, postTodoItem, deleteTodoItem }
