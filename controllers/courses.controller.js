const Course = require('../models/course.model')
const httpStatusText = require("../utils/httpStatusText")
const {validationResult} = require('express-validator')

const getAllCourse = async (req, res) => {
    const courses = await Course.find()
    res.json({stasus: httpStatusText.SUCCESS, data: {courses}})
}

const getCourse = async (req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        if(!course){
            return res.status(404).json({status: httpStatusText.FAIL, data: {course: null}})
        }
        res.json({stasus: httpStatusText.SUCCESS, data: {course}})
    } catch (err){
        return res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message, code:400})
    }
}

const addCourse = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status: httpStatusText.FAIL, data: errors.array()})
    }
    const newCourse = new Course(req.body)
    await newCourse.save() 
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}})
}

module.exports = {
    getAllCourse,
    getCourse,
    addCourse
}