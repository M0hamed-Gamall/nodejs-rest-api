const User = require('../models/user.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}})
})

module.exports = {
    getAllUsers,
}