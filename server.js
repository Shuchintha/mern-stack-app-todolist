import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Todo } from './models/todo.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'

const app = express()

// =========================dotenv.config()===========================================
// dotenv.config() will load the env variables from .env file to the application
// =========================dotenv.config()===========================================
dotenv.config()
const port = process.env.PORT || 5000
connectDB()
// =========================cors()===========================================
// Calling use(cors()) will enable the express server to respond to preflight requests.
// A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
// So CORS are basically a set of headers sent by the server to the browser. calling cors() with no additional information will set the following defaults:
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
// these are translated into these headers:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
// Status Code: 204
// What is this doing is basically making your server accessible to any domain that requests a resource from your server via a browser.
// =========================cors()===========================================
app.use(cors())

// =========================express.json()===========================================
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// =========================express.json()===========================================
app.use(express.json())

// app.use((req, res, next) => {
//   console.log('object')

//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

// =========================Different routes===========================================
// Different routes
// =========================Different routes===========================================
app.use('/api/users', userRoutes)

app.get('/api', async (req, res) => {
  let todoList
  await Todo.find(function (err, todo) {
    if (err) return console.error(err)
    todoList = todo
  })
  res.json(todoList)
})

app.post('/api/todoinput', async (req, res) => {
  const todo = new Todo(req.body)
  let newTodo
  await todo.save(function (err, todo) {
    if (err) return console.error(err)
    res.send(todo)
  })
})

app.delete('/api/tododelete/:id', async (req, res) => {
  console.log('req.params', req.params)
  await Todo.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return handleError(err)
    // deleted at most one todo document
  })
  res.send('Todo has been deleted.')
})

app.listen(port, () => console.log(`Listening on port ${port}...`))
