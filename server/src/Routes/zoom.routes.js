const express = require('express');
const router = express.Router();

const { createGroup } = require('../Controller/ZoomController');

router.post('/group', createGroup);
module.exports = router;