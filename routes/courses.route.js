const express = require('express')
const courseController = require('../controllers/courses.controller')
const {courseValidation} = require('../middlewares/validationSchema')
const verifyToken = require('../middlewares/verifyToken')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middlewares/allowedTo')
const router = express.Router()

router.route('/')
    .get( courseController.getAllCourse)
    .post(verifyToken, allowedTo(userRoles.admin, userRoles.manager), courseValidation(), courseController.addCourse)

router.route('/:id')
    .get( courseController.getCourse)
    .patch(verifyToken, allowedTo(userRoles.admin, userRoles.manager), courseController.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.admin, userRoles.manager), courseController.deleteCourse )

module.exports = router