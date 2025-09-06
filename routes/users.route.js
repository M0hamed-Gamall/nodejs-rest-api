const express = require('express')
const userController = require('../controllers/users.controller')
const {registerValidation} = require('../middlewares/validationSchema')
const {loginValidation} = require('../middlewares/validationSchema')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()

router.route('/')
    .get(verifyToken, userController.getAllUsers)

router.route('/register')
    .post(registerValidation(), userController.register)

router.route('/login')
    .post(loginValidation(), userController.login)

module.exports = router