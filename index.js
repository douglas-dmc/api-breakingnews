import express from "express"
import connectDatabase from "./src/database/db.js"

import useRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import newsRoute from "./src/routes/news.route.js"
import swaggerRoute from "./src/routes/swagger.route.cjs"

const app = express()

const port = process.env.PORT || 3000

connectDatabase()
app.use(express.json())
app.use("/user", useRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
app.use("/doc", swaggerRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
