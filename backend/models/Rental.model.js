const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Item' 
  },
  renterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  // Thêm ownerId để tiện truy vấn cho "MyRentalsView"
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending_confirmation', 'confirmed', 'rejected', 'in_progress', 'completed', 'cancelled'],
    default: 'pending_confirmation'
  }
}, { timestamps: true });

module.exports = mongoose.model('Rental', RentalSchema);