const Course = require('../models/course.model')
const httpStatusText = require("../utils/httpStatusText")
const {validationResult} = require('express-validator')
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require('../utils/appError')

const getAllCourse = asyncWrapper(async (req, res, next) => {
    const query = req.query
    const limit = query.limit || 5
    const page = query.page || 1
    const courses = await Course.find({}, {"__v": false}, {limit, skip: (page - 1) * limit})
    res.json({stasus: httpStatusText.SUCCESS, data: {courses}})
})

const getCourse = asyncWrapper(async (req, res, next) => {
    const course = await Course.findById(req.params.id, {"__v": false})
    if(!course){
        const error = appError.create("Course not found", 404, httpStatusText.FAIL)
        return next(error)
    }
    res.json({stasus: httpStatusText.SUCCESS, data: {course}})
})

const addCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)
    }
    const newCourse = new Course(req.body)
    await newCourse.save() 
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}})
})

const updateCourse = asyncWrapper(async (req, res, next) => {
    const updatedCourse = await Course.updateOne({_id:req.params.id} ,{$set:{ ...req.body}}) 
    if(!updatedCourse){
        const error = appError.create("id not found", 404, httpStatusText.FAIL)
        return next(error)
    } 
    res.status(200).json({status: httpStatusText.SUCCESS, data: {course: updatedCourse}})
})

const deleteCourse = asyncWrapper(async (req, res) => {
    await Course.deleteOne({_id:req.params.id})
    res.json({stasus: httpStatusText.SUCCESS, data: null})
})


module.exports = {
    getAllCourse,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}