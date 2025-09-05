const User = require('../models/user.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require('../utils/appError')
const bcrypt = require('bcryptjs')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const query = req.query
    const limit = query.limit || 5
    const page = query.page || 1
    const users = await User.find({}, {"__v": false, password: false}, {limit, skip: (page - 1) * limit})
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}})
})

const addUser = asyncWrapper( async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    const oldUser = await User.findOne({email})
    if(oldUser){
        const error = appError.create("the email already exists", 400, httpStatusText.FAIL)
        next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({firstName, lastName, email, password: hashedPassword}) 
    await newUser.save()
    res.status(201).json({status: httpStatusText.status, data:{user: newUser}})
})

module.exports = {
    getAllUsers,
    addUser
}