const User = require('../models/user.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require('../utils/appError')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const generateJWT = require('../utils/generateJWT')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const query = req.query
    const limit = query.limit || 5
    const page = query.page || 1
    const users = await User.find({}, {"__v": false, password: false}, {limit, skip: (page - 1) * limit})
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}})
})

const register = asyncWrapper( async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)
    }

    const { firstName, lastName, email, password } = req.body
    const oldUser = await User.findOne({email})
    if(oldUser){
        const error = appError.create("the email already exists", 400, httpStatusText.FAIL)
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({firstName, lastName, email, password: hashedPassword}) 

    const token = await generateJWT({email: newUser.email, id: newUser._id})
    newUser.token = token
    await newUser.save()
    res.status(201).json({status: httpStatusText.status, data:{user: newUser}})
})

const login = asyncWrapper( async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)
    }

    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(!user){
        const error = appError.create("user not found", 400, httpStatusText.FAIL)
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password, user.password)
    if(matchedPassword){
        const token = await generateJWT({email: user.email, id: user._id})
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {token}})
    }else{
        const error = appError.create("something wrong", 400, httpStatusText.FAIL)
        return next(error)
    }
})

module.exports = {
    getAllUsers,
    register,
    login
}