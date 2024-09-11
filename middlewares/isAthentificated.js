import { verify } from "jsonwebtoken"
import User from "../models/User"

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token" })
    }

    const { userId } = verify(token, process.env.JWT_SECRET)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized , id" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(401).json({ message: "Unauthorized , user" })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
      err: err.message
    })
  }
}

export default isAuthenticated
