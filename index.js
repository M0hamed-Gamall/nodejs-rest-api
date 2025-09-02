const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const httpStatusText = require('./utils/httpStatusText')
const app = express()

const mongoose = require('mongoose')
const uri = `mongodb+srv://mohamedGamal:${process.env.DB_PASSWORD}@ecommerce.vxjz39s.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Ecommerce`
mongoose.connect(uri).then(()=>{
    console.log("mongodb connect successfully")
})


const router = require('./routes/courses.route')
app.use(express.json())
app.use('/api/courses', router)
app.use((req, res, next)=> {
    res.status(404).json({status: httpStatusText.ERROR, message: 'Not Found' })
})



app.listen(process.env.PORT,()=>{
    console.log("app is running on port ", process.env.PORT)
})
