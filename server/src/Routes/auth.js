const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.json({ message: 'Danh sách users' });
});

router.get('/products', (req, res) => {
    res.json({ message: 'Danh sách products' });
});

module.exports = router;