const mongoose = require('mongoose')
const { validateReviewRating } = require('../utils/validators')

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please add user id for review"],
        ref: "User"
    },
    comment: {
        type: String,
        trim: true,
        required: [true, "Please add comment for review"]
    },
    rating: {
        type: Number,
        validate: [validateReviewRating, "Please add a rating from 1-5 for review"], 
        required: [true, "Please add rating for review"]
    }
},
{ timestamps: true })

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add name for product"]
    },
    brand: {
        type: String,
        trim: true,
        required: [true, "Please add brand for product"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please add description for product"]
    },
    price: {
        type: Number,
        required: [true, "Please add price for product"]
    },
    taxPrice: {
        type: Number
    },
    stockCount: {
        type: Number,
        required: [true, "Please add stock count for product"]
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [ReviewSchema],
        default: []
    },
    imageUrl: {
        type: String,
        required: [true, "Please add image url for product"]
    },
},
{ timestamps: true })

ProductSchema.pre("save", async function(next) {
    const productTotalRating = this.reviews.reduce((acc, item) => {
        return acc + item.rating
    }, 0)

    this.rating = (productTotalRating / this.reviews.length).toFixed(1)
    this.taxPrice = this.price * 0.1

    next()
})

module.exports = mongoose.model("Product", ProductSchema)