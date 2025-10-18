// backend/controllers/rentals.controller.js
const Rental = require('../models/Rental.model');
const Item = require('../models/Item.model');
const { publishToQueue } = require('../config/rabbitmq');
const mongoose = require('mongoose');

// POST /api/rentals (Create a rental request)
exports.createRentalRequest = async (req, res) => {
  const { itemId, startDate, endDate } = req.body;
  const renterId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.ownerId.equals(renterId)) {
      return res.status(400).json({ message: 'You cannot rent your own item' });
    }
    if (item.status !== 'available') {
        return res.status(400).json({ message: 'Item is not available for rent' });
    }
    
    // Tính toán ngày và tổng giá
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Tính cả ngày bắt đầu
    if (days <= 0) {
        return res.status(400).json({ message: 'End date must be after start date' });
    }
    const totalPrice = days * item.pricePerDay;

    const rental = await Rental.create({
      itemId,
      renterId,
      ownerId: item.ownerId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'pending_confirmation'
    });

    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// Middleware kiểm tra chủ sở hữu item (cho confirm/reject)
const checkRentalOwner = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    if (rental.ownerId.equals(req.user._id)) {
      req.rental = rental;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden (not the item owner)' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Rental not found' });
  }
};

// PATCH /api/rentals/:id/confirm
exports.confirmRental = async (req, res) => {
  const rental = req.rental; // Từ middleware checkRentalOwner

  if (rental.status !== 'pending_confirmation') {
    return res.status(400).json({ message: 'Rental cannot be confirmed' });
  }

  try {
    const item = await Item.findById(rental.itemId);
    if (!item || item.status !== 'available') {
       return res.status(400).json({ message: 'Item is no longer available' });
    }

    // Cập nhật trạng thái
    item.status = 'rented';
    rental.status = 'confirmed';

    await item.save();
    const savedRental = await rental.save();

    // Gửi message đến RabbitMQ
    publishToQueue({
      task: 'rental_status_changed',
      rentalId: savedRental._id,
      status: 'confirmed'
    });

    res.status(200).json(savedRental);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH /api/rentals/:id/reject
exports.rejectRental = async (req, res) => {
  const rental = req.rental; // Từ middleware checkRentalOwner

  if (rental.status !== 'pending_confirmation') {
    return res.status(400).json({ message: 'Rental cannot be rejected' });
  }

  rental.status = 'rejected';
  const savedRental = await rental.save();

  // Gửi message đến RabbitMQ
  publishToQueue({
    task: 'rental_status_changed',
    rentalId: savedRental._id,
    status: 'rejected'
  });

  res.status(200).json(savedRental);
};

// PATCH /api/rentals/:id/complete
exports.completeRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        
        // Chỉ renter hoặc owner mới được complete
        if (!rental.renterId.equals(req.user._id) && !rental.ownerId.equals(req.user._id)) {
            return res.status(403).json({ message: 'Forbidden (not part of this rental)' });
        }
        
        // Chỉ complete khi đã 'confirmed' hoặc 'in_progress'
        if (rental.status !== 'confirmed' && rental.status !== 'in_progress') {
            return res.status(400).json({ message: 'Rental cannot be completed' });
        }
        
        const item = await Item.findById(rental.itemId);
        if (item) {
            // Trả item về 'available'
            item.status = 'available';
            await item.save();
        }

        rental.status = 'completed';
        const savedRental = await rental.save();
        
        res.status(200).json(savedRental);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Đính kèm middleware vào exports
exports.checkRentalOwner = checkRentalOwner;