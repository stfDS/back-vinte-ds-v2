const mongoose = require("mongoose");

const database = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DataBase conected");
  })
  .catch((err) => console.error(err));

module.exports = database;
