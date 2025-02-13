const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../Controller/AuthController');
const { validateRegister, validateLogin } = require('../Middleware/userMiddleware')
const { verifyToken } = require('./../Middleware/authMiddleware');


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.delete('/logout', verifyToken, logout);

module.exports = router;