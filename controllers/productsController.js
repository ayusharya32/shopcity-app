const { handleValidationErrors, validateObjectId } = require('../utils/validators')
const multer = require('multer')
const path = require('path')
const Product = require('../models/Product')

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        const fileName = `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    },
    limits: { fileSize: 1000 * 1000 * 5 }
}).single('productImage')

async function getProducts(req, res) {
    const { keyword } = req.query

    try {
        const searchParams = keyword ? { 
            name: { $regex: keyword, $options: "i" }
        } : {}

        const products = await Product.find({ ...searchParams }).populate("reviews.user", "name email")
        res.status(200).json(products)

    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function getProductById(req, res) {
    const { productId } = req.params

    if(!validateObjectId(productId)) {
        return res.status(400).json({ message: "Invalid ProductId" })
    }

    try {
        const product = await Product.findOne({ _id: productId }).populate("reviews.user", "name email")

        if(product == null) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        res.status(200).json(product)

    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function addProduct(req, res) {
    const { name, brand, description, price, stockCount } = req.body

    if(req.file === undefined) {
        return res.status(400).json({ message: "Required Parameter (productImage) not provided" })
    }

    if(name === undefined || brand === undefined || description === undefined 
        || price === undefined || stockCount === undefined) {

        return res.status(400).json({ 
            message: "Required Parameters (name, brand, description, price, stockCount) not provided" 
        })
    }

    try {
        const productImageUrl = `/${req.file.filename}`

        const product = await Product.create({
            name,
            brand, 
            description,
            price, 
            stockCount,
            imageUrl: productImageUrl
        })

        res.status(201).json({ message: "Product Created Successfully", product })

    } catch(err) {
        const errResponse = handleValidationErrors(err)
        res.status(400).json(errResponse)
    }
}

async function addReviewToProduct(req, res) {
    const { id: userId } = req.user
    const { comment, rating } = req.body
    const { productId } = req.params

    if(comment === undefined || rating === undefined) {
        return res.status(400).json({ message: "Required Body Parameters (comment, rating) not provided" })
    }

    if(!validateObjectId(productId)) {
        return res.status(400).json({ message: "Invalid ProductId" })
    }
    
    try {
        const product = await Product.findOne({ _id: productId })
        if(product == null) {
            return res.status(404).json({ message: "No product found with given productId" })
        }

        if(product.reviews.find(review => review.user.equals(userId))) {
            return res.status(400).json({ message: "Product Already Reviewed" })
        }

        product.reviews.push({
            user: userId,
            comment: comment,
            rating: rating
        })

        const updatedProduct = await product.save()

        await product.populate("reviews.user", "name email")
        res.status(200).json({ message: "Product Reviewed Successfully", product: updatedProduct })

    } catch(err) {
        const errResponse = handleValidationErrors(err)
        res.status(400).json(errResponse)
    }
}

function checkFileType(file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        return cb(null, true)
    }
    return cb(null, false)
}

module.exports = { upload, getProducts, getProductById, addProduct, addReviewToProduct }