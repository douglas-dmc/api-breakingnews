import express from 'express'
import useRoute from './src/routes/user.route.js'
import connectDatabase from './src/database/db.js'
import authRoute from './src/routes/auth.route.js'

const app = express()

const port = 3000

connectDatabase()
app.use(express.json())
app.use("/user", useRoute)
app.use("/auth", authRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
