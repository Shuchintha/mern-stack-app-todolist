import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { Todo } from '../models/todoModal.js'

import dotenv from 'dotenv'

dotenv.config()

const getAllTodos = asyncHandler(async (req, res) => {
  let usersList
  console.log('get all todos -  req.user', req.user)
  const userId = req.user._id
  const todos = await Todo.findOne({ userId })
  console.log('get all todos -  user', todos)

  if (todos) {
    res.json(todos)
  } else {
    res.json({ message: 'The todos modal has been created' })
  }
})

// app.get('/', async (req, res) => {
//   let todoList
//   await Todo.find(function (err, todo) {
//     if (err) return console.error(err)
//     todoList = todo
//   })
//   res.json(todoList)
// })

// app.post('/api/todoinput', async (req, res) => {
//   const todo = new Todo(req.body)
//   let newTodo
//   await todo.save(function (err, todo) {
//     if (err) return console.error(err)
//     res.send(todo)
//   })
// })

// app.delete('/api/tododelete/:id', async (req, res) => {
//   console.log('req.params', req.params)
//   await Todo.deleteOne({ _id: req.params.id }, function (err) {
//     if (err) return handleError(err)
//     // deleted at most one todo document
//   })
//   res.send('Todo has been deleted.')
// })
export { getAllTodos }
