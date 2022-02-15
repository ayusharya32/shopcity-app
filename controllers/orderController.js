const Order = require('../models/Order')
const Product = require('../models/Product')
const { handleValidationErrors, validateObjectId } = require('../utils/validators')

async function getUserOrders(req, res) {
    const { id: userId } = req.user

    try {
        const orders = await Order.find({ user: userId }).sort([['createdAt', -1]]).populate('user', 'name email')
            .populate('orderItems.product', '-reviews').exec()

        res.status(200).json(orders)
    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function getUserOrderById(req, res) {
    const { id: userId } = req.user
    const { orderId } = req.params

    if(!validateObjectId(orderId)) {
        return res.status(400).json({ message: "Invalid Order ID" })
    }

    try {
        const order = await Order.findOne({ _id: orderId, user: userId }).populate('user', 'name email')
            .populate('orderItems.product', '-reviews').exec()

        if(order == null) {
            return res.status(404).json({ message: "Order not found" })
        }

        res.status(200).json(order)
    } catch(err) {
        res.status(400).json({ message: err })
    }
}

async function createOrder(req, res) {
    const { id: userId } = req.user
    const { orderItems, shippingPrice, shippingAddress, isPaid, paymentMethod, 
        paymentDetails, taxPrice, totalPrice } = req.body

    try {
        const order = await Order.create({ 
            user: userId,
            orderItems, 
            shippingPrice, 
            taxPrice,
            totalPrice,
            shippingAddress, 
            isPaid, 
            paymentMethod, 
            paymentDetails 
        })

        order.orderItems.forEach(async (item) => {
            console.info(item)
            console.error({ _id: item.product._id })
            const product = await Product.findOne({ _id: item.product._id })
            const stockLeft = product.stockCount - item.quantity
            product.stockCount = stockLeft > 0 ? stockLeft : 0

            await product.save()
        })

        await order.populate('user', 'name email')
        await order.populate('orderItems.product', '-reviews')

        res.status(200).json(order)

    } catch(err) {
        res.status(400).json(handleValidationErrors(err))
    }
}

async function deliverOrder(req, res) {
    const { orderId } = req.params

    if(!validateObjectId(orderId)) {
        return res.status(400).json({ message: "Invalid Object ID" })
    }

    try {
        const order = await Order.findOne({ _id: orderId })

        if(order == null) {
            return res.status(404).json({ message: "Order not found" })
        }

        if(order.isDelivered) {
            return res.status(400).json({ message: "Order is already delivered" })
        }   

        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.status(200).json({ message: "Order Delivered Successfully", order: updatedOrder })

    } catch(err) {
        res.status(400).json({ message: err })
    }
}

module.exports = { getUserOrders, getUserOrderById, createOrder, deliverOrder }