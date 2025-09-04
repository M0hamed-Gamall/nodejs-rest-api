const User = require('../models/user.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const query = req.query
    const limit = query.limit || 5
    const page = query.page || 1
    const users = await User.find({}, {"__v": false}, {limit, skip: (page - 1) * limit})
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}})
})

module.exports = {
    getAllUsers,
}