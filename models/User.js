const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, required: true },
  account: {
    username: { type: String, required: true },
    avatar: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  newsletter: { type: Boolean, default: false },
  password: { type: String, required: true },
});

module.exports = User;
