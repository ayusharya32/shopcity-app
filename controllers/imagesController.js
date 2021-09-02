const path = require('path')

async function getProductImage(req, res) {
    const fileName = req.query.fileName

    if(fileName === undefined) {
        return res.status(400).json({ message: "Required Query Parameter (fileName) not provided" })
    }

    const filePath = path.resolve(`uploads/${fileName}`)

    res.sendFile(filePath, (err) => {
        if(err) res.status(404).json({ message: "Image Not Found" })
    })
}

module.exports = { getProductImage }