import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && password) {
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
}

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const name = firstName + ' ' + lastName
  console.log('body.', req.body)
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
}

export const getAllUsers = async (req, res) => {
  let usersList
  console.log('getallusers')
  await User.find(function (err, users) {
    if (err) return console.error(err)
    usersList = users
  })

  if (usersList) {
    res.json(usersList)
  } else {
    res.status(401)
    throw new Error('Invalid email or password.')
  }
}
