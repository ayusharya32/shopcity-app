const express = require('express')
const { authenticateAdmin } = require('../middleware/authMiddleware')
const router = express.Router()
const { createAdminUser, loginAdminUser } = require('../controllers/adminController')

router
    .route("/")
    .post(authenticateAdmin, createAdminUser)

router
    .route("/login")
    .post(loginAdminUser)

module.exports = router