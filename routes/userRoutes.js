import express from 'express'
const router = express.Router()

import {
  deleteUser,
  getAllUsers,
  registerUser,
  userLogin,
  updateUser,
} from '../controllers/userControllers.js'
import { admin, protect } from '../middleware/AuthMiddleware.js'

router.post('/login', userLogin)

router.post('/register', registerUser)

router.get('/allusers', protect, admin, getAllUsers)
router.delete('/delete/:id', protect, admin, deleteUser)
router.put('/update', protect, admin, updateUser)

export default router
