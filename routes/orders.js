const express = require('express')
const router = express.Router()
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware')
const { getUserOrders, getUserOrderById, createOrder, deliverOrder } = require("../controllers/orderController")

router
    .route("/")
    .get(authenticateUser, getUserOrders)

router
    .route("/:orderId")
    .get(authenticateUser, getUserOrderById)

router
    .route("/")
    .post(authenticateUser, createOrder)

router
    .route("/:orderId/deliver")
    .put(authenticateAdmin, deliverOrder)

module.exports = router