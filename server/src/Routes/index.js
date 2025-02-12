'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
var cookieParser = require('cookie-parser')
const { verifyToken } = require('./../Middleware/authMiddleware');

router.use(cookieParser())

fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
        const route = require(path.join(__dirname, file));
        const routeName = file.replace('.routes.js', '');
        if (routeName == 'auth') {
            router.use(`/api/${routeName}`, route);
        } else
            router.use(`/api/${routeName}`, verifyToken, route);
    }
});

module.exports = router;