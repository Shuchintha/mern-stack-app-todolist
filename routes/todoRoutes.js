import express from 'express'
const router = express.Router()

import {
  getAllTodos,
  postTodoItem,
  deleteTodoItem,
} from '../controllers/todoControllers.js'
import { admin, protect } from '../middleware/AuthMiddleware.js'

router.post('/todoinput', protect, postTodoItem)
router.delete('/delete/:id', protect, deleteTodoItem)

router.get('/', protect, getAllTodos)

export default router
