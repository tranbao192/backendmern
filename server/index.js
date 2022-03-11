require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const cors=require("cors")
// const bodyParser = require("body-parser")
const authRouter = require('./routes/auth')

const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')
const connectDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.b3jpg.mongodb.net/mern?retryWrites=true&w=majority`)
        
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)   
    }
}



connectDB()
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})