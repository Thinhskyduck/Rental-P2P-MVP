// backend/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserStatus,
  updateItemStatus
} = require('../controllers/admin.controller');
const { protect, admin } = require('../middleware/auth.middleware');

// Tất cả các route admin đều cần protect và check admin
router.use(protect, admin);

// GET /api/admin/users
router.get('/users', getAllUsers);

// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', updateUserStatus);

// PATCH /api/admin/items/:id/status
router.patch('/items/:id/status', updateItemStatus);

module.exports = router;