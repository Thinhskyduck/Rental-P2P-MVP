const Item = require('../models/Item.model');

// GET /api/items (Search or get list)
exports.searchItems = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: 'i',
          },
        }
      : {};

    // Chỉ lấy các vật phẩm có trạng thái 'available'
    const items = await Item.find({ ...keyword, status: 'available' })
                              .select('_id name pricePerDay images')
                              .sort({ createdAt: -1 })
                              .limit(20);

    // Định dạng lại dữ liệu trả về cho phù hợp với schema ItemSummary trong Swagger
    const itemSummaries = items.map(item => ({
        _id: item._id,
        name: item.name,
        pricePerDay: item.pricePerDay,
        mainImage: (item.images && item.images.length > 0) ? item.images[0] : ''
    }));

    res.status(200).json(itemSummaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while searching items' });
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
      ownerId: req.user.id // Lấy từ middleware 'protect'
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
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
    
    if (item.ownerId.toString() === req.user.id) {
      req.item = item;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden (not the owner)' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/items/:id
exports.updateItem = async (req, res) => {
  const { name, description, pricePerDay, address, images, status } = req.body;
  const item = req.item; // Lấy từ middleware checkOwner

  item.name = name ?? item.name;
  item.description = description ?? item.description;
  item.pricePerDay = pricePerDay ?? item.pricePerDay;
  item.address = address ?? item.address;
  item.images = images ?? item.images;
  
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
  try {
    if (req.item.status === 'rented') {
        return res.status(400).json({ message: 'Cannot delete item while it is being rented.' });
    }
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.checkOwner = checkOwner;