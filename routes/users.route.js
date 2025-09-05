const express = require('express')
const userController = require('../controllers/users.controller')
const {registerValidation} = require('../middlewares/validationSchema')
const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)

router.route('/register')
    .post(registerValidation(), userController.register)


module.exports = router