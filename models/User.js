import { model, Schema } from "mongoose"

const User = model("User", {
  email: { type: String, required: true },
  account: {
    username: { type: String, required: true },
    avatar: { type: Schema.Types.Mixed, default: {} }
  },
  newsletter: { type: Boolean, default: false },
  password: { type: String, required: true }
})

export default User
