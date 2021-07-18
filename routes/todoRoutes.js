import express from 'express'
const router = express.Router()

import {
  getAllTodos,
  postTodoItem,
  deleteTodoItem,
  updateTodoDone,
  updateTodoItem,
} from '../controllers/todoControllers.js'
import { admin, protect } from '../middleware/AuthMiddleware.js'

router.post('/todoinput', protect, postTodoItem)
router.put('/tododoneupdate', protect, updateTodoDone)
router.delete('/delete/:id', protect, deleteTodoItem)
router.put('/edit/:id', protect, updateTodoItem)
router.get('/', protect, getAllTodos)
export default router
