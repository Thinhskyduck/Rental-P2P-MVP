const express = require('express');
const router = express.Router();
const { getItemDetailView, getMyRentalsView } = require('../controllers/views.controller');
const { protect } = require('../middleware/auth.middleware');

// spec: /views/item-details/{id} (Không cần login)
router.get('/item-details/:id', getItemDetailView);

// spec: /views/my-rentals (Cần login)
router.get('/my-rentals', protect, getMyRentalsView);

module.exports = router;