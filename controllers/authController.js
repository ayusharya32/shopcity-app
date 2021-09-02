const { User } = require('../models/User')
const { generateToken } = require('../utils/authUtils')
const { handleAuthErrors } = require('../utils/validators')

async function registerUser(req, res) {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })

        const token = generateToken(user._id)
        res.status(201).json({ accessToken: token })
    } catch(err) {
        const errResponse = handleAuthErrors(err)

        res.status(400).json(errResponse)
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body

    try {
        if(email === undefined || password === undefined) {
            throw("Required Body Parameters (email, password) not provided")
        }

        const user = await User.login(email, password)

        const token = generateToken(user._id)
        res.status(200).json({ accessToken: token })
    } catch(err) {
        const errResponse = handleAuthErrors(err)
        res.status(400).json(errResponse)
    }
}

module.exports = { registerUser, loginUser }