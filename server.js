const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const imagesRoute = require('./routes/images')
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')
const path = require('path')

dotenv.config({ path: './config/config.env' })
const app = express()

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/images", imagesRoute)
app.use("/api/products", productsRoute)
app.use("/api/orders", ordersRoute)

app.use(express.static(path.join(__dirname, "/uploads")))

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")))

    app.get("*", function(req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", function(req, res) {
        res.send("API is running...")
    })
}

connectDbAndServer()

async function connectDbAndServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
        console.log('MongoDB Connected');

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => console.log('Server listening on PORT ' + PORT))
    } catch(err) {
        console.log(`Error connecting MongoDB: ${err}`);
    } 
}