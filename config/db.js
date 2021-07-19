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
    mongoose.connection
      .on('error', console.error.bind(console, 'connection error:'))
      .once('open', function () {
        console.log('Successfully connected to the mongoDB database.')
      })
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDB
