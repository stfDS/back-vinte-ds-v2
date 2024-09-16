import express, { json } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

const app = express()

dotenv.config()

import "./data/database.connection.js"
import "./data/cloudinary.config.js"
import offersRouter from "./routes/Offer.js"
import userRouter from "./routes/User.js"

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: process.env.ORIGIN
}

app.use(json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(offersRouter)
app.use(userRouter)

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" })
})

app.listen(process.env.PORT, () => console.log("Server Started"))
