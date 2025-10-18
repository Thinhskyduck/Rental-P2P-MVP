const Item = require('../models/Item.model');

// GET /api/items (Search or get list)
exports.searchItems = async (req, res) => {
  const keyword = req.query.search 
    ? {
        name: {
          $regex: req.query.search, // Tìm kiếm theo regex
          $options: 'i', // không phân biệt hoa thường
        },
        status: 'available' // Chỉ tìm item 'available'
      }
    : { status: 'available' }; // Nếu không search, lấy tất cả item 'available'

  try {
    const items = await Item.find(keyword)
                            .select('_id name pricePerDay mainImage') // Giống 'ItemSummary'
                            .limit(20); // Thêm giới hạn

    // Giả lập 'mainImage' từ mảng 'images'
    const itemSummaries = items.map(item => ({
        _id: item._id,
        name: item.name,
        pricePerDay: item.pricePerDay,
        mainImage: item.images && item.images.length > 0 ? item.images[0] : ''
    }));

    res.status(200).json(itemSummaries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/items
exports.createItem = async (req, res) => {
  const { name, description, pricePerDay, address, images } = req.body;

  try {
    const item = new Item({
      name,
      description,
      pricePerDay,
      address,
      images,
      ownerId: req.user._id // Lấy từ middleware 'protect'
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem); // Trả về Item đầy đủ
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// Middleware kiểm tra chủ sở hữu item
const checkOwner = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    // So sánh ownerId (ObjectId) với req.user._id (ObjectId)
    if (item.ownerId.equals(req.user._id)) {
      req.item = item; // Gắn item vào req để dùng ở controller
      next();
    } else {
      res.status(403).json({ message: 'Forbidden (not the owner)' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Item not found' });
  }
};

// PUT /api/items/:id
exports.updateItem = async (req, res) => {
  // Middleware 'checkOwner' đã chạy và gắn 'req.item'
  const { name, description, pricePerDay, address, images, status } = req.body;
  const item = req.item;

  item.name = name || item.name;
  item.description = description || item.description;
  item.pricePerDay = pricePerDay || item.pricePerDay;
  item.address = address || item.address;
  item.images = images || item.images;
  // Chỉ chủ sở hữu mới được cập nhật status (ví dụ: tạm ẩn)
  if (status && ['available', 'delisted'].includes(status)) {
     item.status = status;
  }

  try {
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  // Middleware 'checkOwner' đã chạy
  try {
    // Cần kiểm tra xem item có đang được thuê (rented) không
    if (req.item.status === 'rented') {
        return res.status(400).json({ message: 'Cannot delete item while it is being rented.' });
    }
    await req.item.deleteOne(); // Mongoose v6+ dùng deleteOne()
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Gắn thêm module.exports.checkOwner để dùng ở route
module.exports.checkOwner = checkOwner;