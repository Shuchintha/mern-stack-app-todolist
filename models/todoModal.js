import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  userId: String,
  title: String,
  completed: Boolean,
})

export const Todo = mongoose.model('Todo', todoSchema)
