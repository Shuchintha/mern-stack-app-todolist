import express from 'express'
const router = express.Router()

import { getAllTodos } from '../controllers/todoControllers.js'
import { admin, protect } from '../middleware/AuthMiddleware.js'

// router.post('/login', userLogin)

// router.post('/register', registerUser)

router.get('/', protect, getAllTodos)
// router.delete('/delete/:id', protect, admin, deleteUser)
// router.put('/update', protect, admin, updateUser)
// router.post('/createuser', protect, admin, createUser)

export default router
