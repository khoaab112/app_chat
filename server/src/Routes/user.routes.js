const express = require('express');
const router = express.Router();

const { findUserByMailOrKey, addFriend, removeFriend, confirmFriend } = require('../Controller/UserController');

router.get('/find', findUserByMailOrKey);
router.put('/', addFriend);
router.put('/remove-friend', removeFriend);
router.put('/confirm-friend', confirmFriend);

module.exports = router;