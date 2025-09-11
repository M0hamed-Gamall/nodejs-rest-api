const express = require('express')
const userController = require('../controllers/users.controller')
const {registerValidation} = require('../middlewares/validationSchema')
const {loginValidation} = require('../middlewares/validationSchema')
const verifyToken = require('../middlewares/verifyToken')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middlewares/allowedTo')
const router = express.Router()

router.route('/')
    .get(verifyToken, allowedTo(userRoles.admin, userRoles.manager), userController.getAllUsers)

router.route('/register')
    .post(registerValidation(), userController.register)

router.route('/login')
    .post(loginValidation(), userController.login)

module.exports = router