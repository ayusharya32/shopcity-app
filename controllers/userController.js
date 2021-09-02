const { handleValidationErrors, validateObjectId } = require('../utils/validators')
const Product = require('../models/Product')
const { User } = require('../models/User')

async function getCurrentUser(req, res) {
    const { id: userId } = req.user

    try {
        const user = await User.findOne({ _id: userId }).select('-password')

        await user.populate('cartItems.product')
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function updateProfile(req, res){
    const { id: userId } = req.user
    const { name, password } = req.body

    if(name === undefined && password === undefined) {
        return res.status(400).json({ message: "Either one of (name, password) required as Body Params" })
    }

    try {
        const user = await User.findOne({ _id: userId })

        user.name = name || user.name
        user.password = password || user.password

        await user.save()

        await user.populate('cartItems.product')
        res.status(200).json(user)

    } catch(err) {
        const errResponse = handleValidationErrors(err)
        res.status(400).json(errResponse)
    }
}

async function updateShippingAddress(req, res) {
    const { id: userId } = req.user
    const { address, city, state, pincode } = req.body

    try {
        const user = await User.findOne({ _id: userId }).select('-password')

        user.shippingAddress = { address, city, state, pincode }
        await user.save()

        await user.populate('cartItems.product')
        res.status(200).json({ message: "Shipping Address updated successfully", user })

    } catch(err) {
        const errResponse = handleValidationErrors(err)
        res.status(400).json(errResponse)
    }
}

async function addItemToCart(req, res) {
    const { id: userId } = req.user
    let { productId, quantity } = req.body

    if(productId === undefined) {
        return res.status(400).json({ message: "Required Body Parameter (productId) not provided" })
    }

    if(!validateObjectId(productId)) {
        return res.status(400).json({ message: "Invalid ProductId" })
    }

    quantity = quantity > 0 ? quantity : 1 

    try {
        const user = await User.findOne({ _id: userId }).select('-password')

        const product = await Product.findOne({ _id: productId })
        if(product == null) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        if(quantity > product.stockCount) {
            return res.status(400).json({ message: "Requested Quantity not available in stock" })
        }

        if(user.cartItems.find(item => item.product.equals(productId))) {
            user.cartItems = user.cartItems.map(item => {
                if(item.product.equals(productId)) {
                    return { 
                        product: productId,
                        quantity: quantity
                    }
                }
                return item
            })
        } else {
            user.cartItems.push({
                product: productId,
                quantity: quantity
            })
        }

        const updatedUser = await user.save()
        await updatedUser.populate("cartItems.product")

        res.status(200).json({ message: "Cart Item added successfully", user: updatedUser })
    } catch(err) {
        const errResponse = handleValidationErrors(err)
        res.status(400).json(errResponse)
    }
}

async function removeItemFromCart(req, res) {
    const { id: userId } = req.user
    const { productId } = req.params

    try {
        const user = await User.findOne({ _id: userId }).select('-password')

        if(user.cartItems.find(item => item.product.equals(productId)) == null) {
            return res.status(400).json({ message: "No Cart Item found with given productId" })
        }

        user.cartItems = user.cartItems.filter(item => !item.product.equals(productId))

        const updatedUser = await user.save()

        await updatedUser.populate('cartItems.product')
        res.status(200).json({ message: "Cart Item Removed Successfully", user: updatedUser })

    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function clearCartItems(req, res) {
    const { id: userId } = req.user

    try {
        const user = await User.findOne({ _id: userId }).select('-password')

        user.cartItems = []
        const updatedUser = await user.save()

        res.status(200).json({ message: "Cart Cleared Successfully", user: updatedUser })
    } catch(err) {
        res.status(400).json({ message: err })
    }
}

module.exports = { getCurrentUser, updateProfile, updateShippingAddress, 
    addItemToCart, removeItemFromCart, clearCartItems }