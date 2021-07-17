import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const userLogin = async (req, res) => {
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

const registerUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
  let usersList
  console.log('object getallusers')
  await User.find(function (err, users) {
    if (err) return console.error(err)
    usersList = users
  })
  console.log('object getallusers', usersList)

  if (usersList) {
    res.json(usersList)
  } else {
    res.status(401)
    throw new Error('Invalid email or password.')
  }
}

export const deleteUser = async (req, res) => {
  console.log('id params', req.params.id)
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
}

export { userLogin, registerUser, getAllUsers }
