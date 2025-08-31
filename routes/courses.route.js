const express = require('express')
const courseController = require('../controllers/courses.controller')
const {validationSchema} = require('../middlewares/validationSchema')
const router = express.Router()

router.route('/')
    .get( courseController.getAllCourse)
    .post(validationSchema(), courseController.addCourse)

router.route('/:id')
    .get( courseController.getCourse)
    .patch( courseController.updateCourse)

module.exports = router