import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password.')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const name = firstName + ' ' + lastName
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  let usersList = await User.find()

  if (usersList) {
    res.json(usersList)
  } else {
    res.status(401)
    throw new Error('Could not find users.')
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await User.deleteOne(user, function (err) {
      if (err) return handleError(err)
    })
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id)

  if (user) {
    user.isAdmin = !user.isAdmin
    const updatedUser = await user.save()
    if (updatedUser.isAdmin) {
      return res.json({ message: 'The user is now an admin.' })
    }
    res.json({ message: 'The user is no longer admin.' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body
  const name = firstName + ' ' + lastName
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }
  const password = process.env.ADMIN_CREATED_USER_PASSORD
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.json({ message: 'The new user was created by the admin.' })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export {
  userLogin,
  registerUser,
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
}
