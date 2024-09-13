import { Router } from "express"
const offersRouter = Router()
// Import models
import Offer from "../models/Offer.js"
import User from "../models/User.js"

import dotenv from "dotenv"
dotenv.config()

import fileUpload from "express-fileupload"
import { v2 as cloudinary } from "cloudinary"
import { promises as fs } from "fs" // Using fs to read the JSON file

// Function to read offers data from JSON file
const getOffersData = async () => {
  const data = await fs.readFile("./data/offers.json", "utf-8")
  return JSON.parse(data)
}

// Route to get offers based on query parameters
offersRouter.get("/offers", async (req, res) => {
  try {
    // Retrieve query parameters
    const { title, priceMin, priceMax, sortPrice } = req.query
    const skip = Number(req.query.skip) // Convert skip to a number
    // Create the filter object for search conditions
    const filter = {}

    // Filter by title using case-insensitive regular expression
    if (title) {
      filter.product_name = new RegExp(title, "i")
    }

    // Filter by minimum and maximum price
    if (priceMin || priceMax) {
      filter.product_price = {}

      if (priceMin) {
        filter.product_price.$gte = Number(priceMin) // Greater than or equal
      }

      if (priceMax) {
        filter.product_price.$lte = Number(priceMax) // Less than or equal
      }
    }

    // Prepare sorting options
    const sortFilter = {}

    if (sortPrice) {
      sortFilter.product_price = sortPrice
    }

    // Limit results to 10 per page and calculate the offset with skip
    const offers = await Offer.find(filter)
      .limit(10)
      .populate("owner", "account")
      .sort(sortFilter)
      .skip(skip)

    // Count the total number of offers that match the search criteria
    const numberOfOffers = await Offer.countDocuments(filter)

    // Return the total number of offers and the offers themselves
    res.json({ count: numberOfOffers, offers })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Route to reset offers, deleting all current offers and uploading new ones
offersRouter.post(
  `/reset-offers/${process.env.RESET}`,
  fileUpload(),
  async (req, res) => {
    try {
      const offers = await getOffersData() // Load offers data from JSON
      const users = await User.find() // Find all users
      await Offer.deleteMany({}) // Delete all existing offers
      await cloudinary.api.delete_resources_by_prefix("vinted/offers-v2") // Delete all offers images from Cloudinary

      for (let i = 0; i < offers.length; i++) {
        // Upload the main product image to Cloudinary
        const pic = await cloudinary.uploader.upload(
          offers[i].product_image.secure_url,
          {
            folder: "vinted/offers-v2"
          }
        )

        // Create a new offer using the data and assign it to a random user
        const newOffer = new Offer({
          product_name: offers[i].product_name,
          product_description: offers[i].product_description,
          product_price: offers[i].product_price,
          product_details: offers[i].product_details,
          owner: users[Math.floor(Math.random() * users.length)],
          product_image: pic,
          product_pictures: []
        })

        let allProduct_pictures = []
        // Check if there are additional product pictures and upload them
        if (offers[i].product_pictures.length) {
          for (let j = 0; j < offers[i].product_pictures.length; j++) {
            const multipic = await cloudinary.uploader.upload(
              offers[i].product_pictures[j].secure_url,
              { folder: "vinted/offers-v2" }
            )
            allProduct_pictures.push(multipic)
          }
        }
        newOffer.product_pictures = allProduct_pictures

        // Save the new offer to the database
        await newOffer.save()
      }

      // Send success response when all offers are created
      res.json({ message: "offers created" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

export default offersRouter
