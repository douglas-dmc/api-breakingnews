import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const username = process.env.DB_USER
const password = process.env.DB_PWD

const connectDatabase = () => {
    console.log("Wait connecting to the database...")

    mongoose
        .connect(
            `mongodb+srv://${username}:${password}@cluster0.vcnesjk.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => console.log("MongoDB Atlas connected"))
        .catch((error) => console.log(error))
}

export default connectDatabase
