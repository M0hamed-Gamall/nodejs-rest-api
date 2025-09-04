const express = require('express')
const userController = require('../controllers/users.controller')
const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)

module.exports = router