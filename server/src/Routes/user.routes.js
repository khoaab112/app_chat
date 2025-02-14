const express = require('express');
const router = express.Router();

const { findUserByMailOrKey, addFriend, removeFriend } = require('../Controller/UserController');

router.get('/find', findUserByMailOrKey);
router.put('/', addFriend);
router.put('/remove-friend', removeFriend);

module.exports = router;