
const {body} = require('express-validator')

const courseValidation = () => { 
    return [
        body('title')
            .notEmpty()
            .withMessage('title is required')
            .isLength(2).withMessage('at least 2 chars'),
        body('price')
            .notEmpty()
    ]
}

const registerValidation = () => {
    return [
        body('firstName')
            .notEmpty()
            .withMessage('firstName is required'),
            
        body('lastName')
            .notEmpty()
            .withMessage('lastName is required'),
            
        body('email')
            .isEmail()
            .withMessage('enter a valid email'),
            
        body('password')
            .isLength(8)
            .withMessage('password length must be more then 7'),
            
    ]
}

const loginValidation = () => {
    return[
        body('email')
            .isEmail()
            .withMessage('enter a valid email'),
                
        body('password')
            .notEmpty()
            .withMessage("password is required")
    ]
}

module.exports = { courseValidation, registerValidation, loginValidation }