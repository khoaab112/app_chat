const express = require('express');
const router = express.Router();
const { register } = require('../Controller/AuthController')


router.post('/register', register);

router.get('/products', (req, res) => {
    res.json({ message: 'Danh sách products' });
});

module.exports = router;