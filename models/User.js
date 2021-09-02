const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const { validateName, validatePassword } = require('../utils/validators') 

const ShippingAddressSchema = new mongoose.Schema({
    _id: false,
    address: { 
        type: String, 
        trim: true,
        required: [true, "Please add address for Shipping"]
    },
    city: {
        type: String, 
        trim: true,
        required: [true, "Please add city for Shipping"]
    },
    state: { 
        type: String, 
        trim: true,
        required: [true, "Please add state for Shipping"] 
    },
    pincode: { 
        type: Number,
        required: [true, "Please add pincode for Shipping"] 
    }
})

const CartItemSchema = new mongoose.Schema({
    _id: false,
    product: { 
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please add product id for Cart Item"],
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [4, "Name should contain at least 4 characters"],
        maxlength: [30, "Name should not be greater than 30 characters"],
        validate: [validateName, "Please enter a valid name"],
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: [isEmail, "Please enter a valid email"],
        required: [true, "Please add an email"]
    },
    password: {
		type: String,
		trim: true,
		minlength: [6, "Password should have at least 6 characters"],
		validate: [validatePassword, "Password should have at least one lowercase, one uppercase and a special character"],
		required: [true, "Please add a password"]
	},
    shippingAddress: {
        type: ShippingAddressSchema
    },
    cartItems: {
        type: [CartItemSchema],
        default: []
    }
}, 
{ timestamps: true })

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email })

    if(user) {
        const authResult = await bcrypt.compare(password, user.password)

        if(authResult) {
            return user
        }
        
        throw("Incorrect Password")
    } else {
        throw("Email not found")
    }
}

const User = mongoose.model("User", UserSchema)

module.exports = { User }