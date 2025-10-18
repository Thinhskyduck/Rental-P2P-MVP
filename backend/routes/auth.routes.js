const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// spec: /auth/register
router.post('/register', registerUser);

// spec: /auth/login
router.post('/login', loginUser);

// spec: /auth/logout (yêu cầu đã đăng nhập)
router.post('/logout', protect, logoutUser);

module.exports = router;