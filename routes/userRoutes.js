import express from 'express'
const router = express.Router()

import {
  getAllUsers,
  registerUser,
  userLogin,
} from '../controllers/userControllers.js'

router.post('/login', userLogin)

router.post('/register', registerUser)

router.get('/allusers', getAllUsers)

export default router
