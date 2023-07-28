import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const hostname = process.env.DB_HOST
const dataport = process.env.DB_PORT
const database = process.env.DB_NAME

const connectDatabase = () => {
    console.log('Wait connecting to the database...')
    
    mongoose.connect(`mongodb://${hostname}:${dataport}/${database}`, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error))
}

export default connectDatabase