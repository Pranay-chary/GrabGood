const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { login, register, getMe } = require('../controllers/authController');

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current logged in user
router.get('/me', authMiddleware, getMe);

module.exports = router;
