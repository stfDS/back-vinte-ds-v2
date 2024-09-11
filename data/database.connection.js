import { connect } from "mongoose"

const database = connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DataBase conected")
  })
  .catch(err => console.error(err))

export default database
