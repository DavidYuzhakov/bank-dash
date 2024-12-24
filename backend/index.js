import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import AuthRoutes from "./routes/AuthRoutes.js"


const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  // credentials: true,
  // origin: 'http://localhost:5173' // replase to env-var
}))

const PORT = process.env.PORT || 4000

app.use('/auth', AuthRoutes)

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
  } catch (e) {
    console.log('DB error:', e)
    process.exit(1)
  }
}

start()