import express from "express"
import connectDatabase from "./src/database/db.js"
import cors from 'cors'

import useRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import newsRoute from "./src/routes/news.route.js"
import swaggerRoute from "./src/routes/swagger.route.cjs"

const app = express()

const port = process.env.PORT || 3000

const corsOptions = {
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200
}

connectDatabase()

app.use(express.json())
app.use("/user", cors(corsOptions), useRoute)
app.use("/auth", cors(corsOptions), authRoute)
app.use("/news", cors(corsOptions), newsRoute)
app.use("/doc", cors(corsOptions), swaggerRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
