const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../Controller/AuthController');
const { validateRegister, validateLogin } = require('../Middleware/userMiddleware')


router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);
router.delete('/logout', logout);

module.exports = router;