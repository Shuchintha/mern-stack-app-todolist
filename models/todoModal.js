import mongoose from 'mongoose'

const Todos = new mongoose.Schema({
  title: String,
  body: String,
  isDone: {
    type: Boolean,
    default: false,
  },
})

const TodoSchema = new mongoose.Schema({
  userId: String,
  todos: {
    type: [Todos],
    default: undefined,
  },
})

export const Todo = mongoose.model('Todo', TodoSchema)
