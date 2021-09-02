const jwt = require('jsonwebtoken')

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
}

module.exports = { generateToken }