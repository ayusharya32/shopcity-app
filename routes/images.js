const express = require('express')
const router = express.Router()
const { getProductImage } = require('../controllers/imagesController')

router
    .route("/product")
    .get(getProductImage)

module.exports = router
