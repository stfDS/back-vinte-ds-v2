import { model, Schema } from "mongoose"

const Offer = model("Offer", {
  product_name: { type: String, required: true },
  product_description: String,
  product_price: { type: Number, required: true },
  product_details: Array,
  product_image: { type: Schema.Types.Mixed, default: {} },
  product_pictures: Array,
  product_date: { type: Date, default: Date.now },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

export default Offer
