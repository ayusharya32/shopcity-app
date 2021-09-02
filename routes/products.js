const express = require('express')
const router = express.Router()
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware')
const { upload, getProducts, getProductById, 
    addProduct, addReviewToProduct } = require('../controllers/productsController')

router
    .route("/")
    .get(authenticateUser, getProducts)

router
    .route("/:productId")
    .get(authenticateUser, getProductById)

router
    .route("/")
    .post(authenticateAdmin, upload, addProduct)

router
    .route("/:productId/reviews")
    .post(authenticateUser, addReviewToProduct)

module.exports = router