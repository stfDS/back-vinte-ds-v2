import { connect } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const database = connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DataBase conected")
  })
  .catch(err => console.error(err))

export default database
