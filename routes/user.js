const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authMiddleware')
const { getCurrentUser, updateProfile, updateShippingAddress, 
    addItemToCart, removeItemFromCart, clearCartItems } = require('../controllers/userController')

router
    .route("/")
    .get(authenticateUser, getCurrentUser)

router
    .route("/profile")
    .put(authenticateUser, updateProfile)

router
    .route("/shipping")
    .put(authenticateUser, updateShippingAddress)

router
    .route("/cart/add")
    .put(authenticateUser, addItemToCart)

router
    .route("/cart/remove/:productId")
    .put(authenticateUser, removeItemFromCart)

router
    .route("/cart/clear")
    .put(authenticateUser, clearCartItems)

module.exports = router