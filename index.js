const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const httpStatusText = require('./utils/httpStatusText')
const cors = require('cors')
const router = require('./routes/courses.route')

const app = express()

const mongoose = require('mongoose')
const uri = `mongodb+srv://mohamedGamal:${process.env.DB_PASSWORD}@ecommerce.vxjz39s.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Ecommerce`
mongoose.connect(uri).then(()=>{
    console.log("mongodb connect successfully")
})

app.use(cors())
app.use(express.json())
app.use('/api/courses', router)

app.use((req, res, next)=> {
    res.status(404).json({status: httpStatusText.ERROR, message: 'Not Found' })
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({code: err.statusCode || 500, status: err.statusText || httpStatusText.ERROR, message: err.message})
})


app.listen(process.env.PORT,()=>{
    console.log("app is running on port ", process.env.PORT)
})
