// backend/routes/rentals.routes.js
const express = require('express');
const router = express.Router();
const {
  createRentalRequest,
  confirmRental,
  rejectRental,
  completeRental,
  checkRentalOwner
} = require('../controllers/rentals.controller');
const { protect } = require('../middleware/auth.middleware');

// POST /api/rentals - (Renter) Tạo yêu cầu
router.post('/', protect, createRentalRequest);

// PATCH /api/rentals/:id/confirm - (Owner) Xác nhận
router.patch('/:id/confirm', protect, checkRentalOwner, confirmRental);

// PATCH /api/rentals/:id/reject - (Owner) Từ chối
router.patch('/:id/reject', protect, checkRentalOwner, rejectRental);

// PATCH /api/rentals/:id/complete - (Owner hoặc Renter) Hoàn thành
router.patch('/:id/complete', protect, completeRental);

module.exports = router;