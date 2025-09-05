const express = require('express')
const courseController = require('../controllers/courses.controller')
const {courseValidation} = require('../middlewares/validationSchema')
const router = express.Router()

router.route('/')
    .get( courseController.getAllCourse)
    .post(courseValidation(), courseController.addCourse)

router.route('/:id')
    .get( courseController.getCourse)
    .patch( courseController.updateCourse)
    .delete( courseController.deleteCourse )

module.exports = router