const express = require('express');
const router = express.Router();
const { register, confirmAccount, login, logout, forgotPassword } = require('../Controller/AuthController');
const { validateRegister, validateLogin, validateReset } = require('../Middleware/userMiddleware')
const { verifyToken } = require('./../Middleware/authMiddleware');


router.post('/register', validateRegister, register);
router.get('/confirm/:token', confirmAccount);
router.post('/login', validateLogin, login);
router.delete('/logout', verifyToken, logout);
router.post('/forgot-password', validateReset, forgotPassword);

module.exports = router;