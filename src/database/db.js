import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const hostname = process.env.DB_HOST

const connectDatabase = () => {
    console.log("Wait connecting to the database...")

    mongoose
        .connect(hostname, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Atlas connected"))
        .catch((error) => console.log(error))
}

export default connectDatabase
