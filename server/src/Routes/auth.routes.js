const express = require('express');
const router = express.Router();
const { register, login } = require('../Controller/AuthController');
const { validateRegister, validateLogin } = require('../Middleware/userMiddleware')


router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

module.exports = router;