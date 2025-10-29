const express = require('express');
const router = express.Router();
// 1. Sửa dòng import này, thêm "getMe" vào cuối
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// spec: /auth/register
router.post('/register', registerUser);

// spec: /auth/login
router.post('/login', loginUser);

// spec: /auth/logout (yêu cầu đã đăng nhập)
router.post('/logout', protect, logoutUser);

// 2. THÊM ROUTE MỚI NÀY
// (Route này sẽ dùng token (qua middleware 'protect') để tìm và trả về user)
router.get('/me', protect, getMe);

module.exports = router;