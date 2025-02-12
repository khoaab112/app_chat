const { body, validationResult } = require('express-validator');
const responseHelper = require('../Helpers/reponseHelper');
// Middleware kiểm tra request
const validateRegister = [
    body('first_name').notEmpty().withMessage('first_name is required'),
    body('last_name').notEmpty().withMessage('last_name is required'),
    body('email').isEmail().withMessage('Please enter a valid mail!'),
    body('password').isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseHelper(res, 400, errors.errors[0].msg);
        }
        next();
    }
];

const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid mail!'),
    body('password').isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseHelper(res, 400, errors.errors[0].msg);
        }
        next();
    }
]
module.exports = { validateRegister, validateLogin };