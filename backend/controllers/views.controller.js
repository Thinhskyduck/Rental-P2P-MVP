const Item = require('../models/Item.model');
const Rental = require('../models/Rental.model');
const mongoose = require('mongoose');

// GET /api/views/item-details/:id
exports.getItemDetailView = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({ message: 'Invalid Item ID' });
  }

  try {
    const item = await Item.findById(req.params.id)
      // Dùng 'populate' để lấy thông tin 'owner' từ 'ownerId'
      .populate(
        'ownerId', // Tên field trong ItemSchema
        'fullName avatarUrl _id' // Các trường cần lấy từ User (giống 'UserSummary')
      ); 

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Định dạng lại data cho giống 'ItemDetailView'
    const viewData = {
        _id: item._id,
        name: item.name,
        description: item.description,
        images: item.images,
        pricePerDay: item.pricePerDay,
        address: item.address,
        // 'populate' sẽ biến 'ownerId' thành object 'owner'
        owner: item.ownerId 
    };

    res.status(200).json(viewData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/views/my-rentals
exports.getMyRentalsView = async (req, res) => {
  const userId = req.user._id; // Lấy từ middleware 'protect'

  // Helper function để populate dữ liệu cho 'RentalDetail'
  const populateOptions = [
      {
          path: 'itemId', // Tên field trong RentalSchema
          select: '_id name pricePerDay mainImage', // Giống 'ItemSummary'
          // Chúng ta cần 'mainImage' (giống Bước 6 - ItemController)
      },
      // 'counterparty' sẽ khác nhau tùy ngữ cảnh
  ];

  try {
    // 1. Lấy các đơn tôi là người thuê (asRenter)
    const asRenter = await Rental.find({ renterId: userId })
      .populate(populateOptions)
      .populate({ // Lấy thông tin chủ sở hữu (owner)
          path: 'ownerId',
          select: '_id fullName avatarUrl' // UserSummary
      });

    // 2. Lấy các đơn tôi là chủ (asOwner)
    const asOwner = await Rental.find({ ownerId: userId })
      .populate(populateOptions)
      .populate({ // Lấy thông tin người thuê (renter)
          path: 'renterId',
          select: '_id fullName avatarUrl' // UserSummary
      });

    // Hàm helper để định dạng lại
    const formatRentalDetail = (rental, counterpartyField) => {
        const item = rental.itemId;
        const itemSummary = item ? {
            _id: item._id,
            name: item.name,
            pricePerDay: item.pricePerDay,
            mainImage: (item.images && item.images.length > 0) ? item.images[0] : ''
        } : null;

        return {
            _id: rental._id,
            startDate: rental.startDate,
            endDate: rental.endDate,
            totalPrice: rental.totalPrice,
            status: rental.status,
            item: itemSummary,
            counterparty: rental[counterpartyField] // 'ownerId' hoặc 'renterId' đã được populate
        };
    };

    // Trả về kết quả
    res.status(200).json({
      asRenter: asRenter.map(r => formatRentalDetail(r, 'ownerId')),
      asOwner: asOwner.map(r => formatRentalDetail(r, 'renterId')),
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};