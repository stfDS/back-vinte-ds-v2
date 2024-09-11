import express, { json } from "express"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"

import cors from "cors"
const app = express()

require("dotenv").config()

import "./database/database.conection"

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: process.env.ORIGIN
}

app.use(json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.get("/", (req, res) => res.send("Hello World!"))

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" })
})

app.listen(process.env.PORT, () => console.log("Server Started"))
