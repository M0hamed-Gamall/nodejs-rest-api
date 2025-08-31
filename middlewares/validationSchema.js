
const {body} = require('express-validator')

const validationSchema = () =>{ 
    return [
        body('title')
            .notEmpty()
            .withMessage('title is required')
            .isLength(2).withMessage('at least 2 chars'),
        body('price')
            .notEmpty()
    ]
}
module.exports = { validationSchema }