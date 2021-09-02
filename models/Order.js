const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please add user for order"],
        ref: "User"
    }, 
    orderNumber: {
        type: String
    },
    orderItems: [{
        product: { 
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, "Please add product id for Order Item"],
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: [true, "Please add total price for order"]
    },
    taxPrice: {
        type: Number,
        required: [true, "Please add tax price for order"]
    },
    shippingPrice: {
        type: Number,
        required: [true, "Please add shipping price for order"]
    },
    shippingAddress: {
        type: String,
        required: [true, "Please add an address for Shipping"]
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        required: [true, "Please add payment method"]
    },
    paymentDetails: {
        id: { type: String },
        payerName: { type: String },
        paymentTime: { type: String }
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: { 
        type: String 
    }
},
{ timestamps: true })

OrderSchema.pre("save", async function(next) {

    this.orderNumber = `Order-#-${Date.now()}`
    console.log(this.orderNumber);

    next()
})

module.exports = mongoose.model("Order", OrderSchema)