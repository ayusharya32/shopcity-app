const AdminUser = require('../models/AdminUser')
const { generateToken } = require('../utils/authUtils')
const { handleAuthErrors } = require('../utils/validators')

async function createAdminUser(req, res) {
    const { name, email, password } = req.body

    try {
        const adminUser = await AdminUser.create({ name, email, password })

        const token = generateToken(adminUser._id)
        res.status(201).json({ accessToken: token })
    } catch(err) {
        const errResponse = handleAuthErrors(err)

        res.status(400).json(errResponse)
    }
}

async function loginAdminUser(req, res) {
    const { email, password } = req.body

    try {
        if(email === undefined || password === undefined) {
            throw("Required Body Parameters (email, password) not provided")
        }

        const admin = await AdminUser.login(email, password)

        const token = generateToken(admin._id)
        res.status(200).json({ accessToken: token })
    } catch(err) {
        const errResponse = handleAuthErrors(err)
        res.status(400).json(errResponse)
    }
}

module.exports = { createAdminUser, loginAdminUser }