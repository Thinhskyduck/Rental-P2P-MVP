// backend/controllers/admin.controller.js
const User = require('../models/User.model');
const Item = require('../models/Item.model');

// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/admin/users/:id/status
exports.updateUserStatus = async (req, res) => {
  const { isBanned } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBanned = isBanned;
    await user.save();
    res.status(200).json({ message: 'User status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/admin/items/:id/status
exports.updateItemStatus = async (req, res) => {
  const { status } = req.body; // "available", "rented", "delisted"
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.status = status;
    await item.save();
    res.status(200).json({ message: 'Item status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};