const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  product_name: { type: String, required: true },
  product_description: String,
  product_price: { type: Number, required: true },
  product_details: Array,
  product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  product_pictures: Array,
  product_date: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Offer;
