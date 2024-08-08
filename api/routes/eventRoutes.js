const express = require('express');
const router = express.Router();
const { registerUser, getUsersByEvent } = require('../controllers/eventController');

router.post('/register', registerUser);
router.get('/:eventName/users', getUsersByEvent);

module.exports = router;
