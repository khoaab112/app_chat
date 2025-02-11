'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
        const route = require(path.join(__dirname, file));
        const routeName = file.replace('.routes.js', '');
        router.use(`/api/${routeName}`, route);
    }
});

module.exports = router;