import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbURI = process.env.ATLAS_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoose.connection.once('open', function () {
      console.log('Successfully connected to the mongoDB database.')
    })
    console.log('SFDSF ' + conn.connection.host)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDB
