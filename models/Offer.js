import { model, Schema } from "mongoose"

const offerSchema = new Schema({
  product_name: { type: String, required: true },
  product_description: { type: String },
  product_price: { type: Number, required: true },
  product_details: Array,
  product_image: { type: Schema.Types.Mixed, default: {} },
  product_pictures: Array,
  product_date: { type: Date, default: Date.now },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

// Créer et exporter le modèle Offer
const Offer = model("Offer", offerSchema)

export default Offer
