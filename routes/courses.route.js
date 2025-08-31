const express = require('express')
const courseController = require('../controllers/courses.controller')
const router = express.Router()

router.route('/')
    .get( courseController.getAllCourse)


router.route('/:id')
    .get( courseController.getCourse)

module.exports = router