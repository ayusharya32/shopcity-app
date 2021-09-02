const jwt = require("jsonwebtoken")
const AdminUser = require("../models/AdminUser")
const { User } = require("../models/User")

async function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(401).json({ message: "Unauthorized: Access Token Required" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decodedToken.id }).select('-password')

        if(user == null) {
            return res.status(404).json({ message: "No User found with given id" })
        }

        req.user = decodedToken
        next()

    } catch(err) {
        res.status(403).json({ message: "Invalid Token" })
    }
}

async function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(401).json({ message: "Unauthorized: Access Token Required" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const admin = await AdminUser.findOne({ _id: decodedToken.id }).select('-password')

        if(admin == null) {
            return res.status(403).json({ message: "Forbidden: Not an admin user" })
        }

        req.admin = admin
        next()

    } catch(err) {
        res.status(403).json({ message: "Invalid Token" })
    }
}

module.exports = { authenticateUser, authenticateAdmin }