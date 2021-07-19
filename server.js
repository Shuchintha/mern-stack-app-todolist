import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMidlleware.js'

const app = express()

// =========================dotenv.config()===========================================
// dotenv.config() will load the env variables from .env file to the application
// =========================dotenv.config()===========================================
dotenv.config()
const port = process.env.PORT || 5000
connectDB()
// =========================cors()===========================================
// Calling use(cors()) will enable the express server to respond to preflight requests.
// =========================cors()===========================================
app.use(cors())

// =========================express.json()===========================================
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// =========================express.json()===========================================
app.use(express.json())

// =========================Different routes===========================================
// Different routes
// =========================Different routes===========================================
app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}...`))
