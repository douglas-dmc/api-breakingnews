import mongoose from 'mongoose'

const connectDatabase = () => {
    console.log('Wait connecting to the database')

    mongoose.connect('mongodb://127.0.0.1:27017/breakingnews', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error))
}

export default connectDatabase