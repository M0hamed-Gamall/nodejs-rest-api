const mongoose = require('mongoose')
const validator = require('validator')
const userRoles = require('../utils/userRoles')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'field must be a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        
    },
    role: {
        type: String,
        enum: [userRoles.user, userRoles.manager, userRoles.admin],
        default: userRoles.user
    }
})

module.exports = mongoose.model('User', userSchema)