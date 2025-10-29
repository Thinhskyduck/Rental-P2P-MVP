// backend/controllers/items.controller.js
const Item = require('../models/Item.model');

// >>> SỬA 1: Bỏ 'exports.' và định nghĩa như một hằng số (const)
const searchItems = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: 'i',
          },
        }
      : {};

    // Thay vì chỉ lấy 'available', chúng ta lấy tất cả những gì KHÔNG BỊ 'delisted'
    const items = await Item.find({ ...keyword, status: { $ne: 'delisted' } })
                              .select('_id name pricePerDay images')
                              .sort({ createdAt: -1 })
                              .limit(20);

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

// >>> SỬA 2: Bỏ 'exports.'
const createItem = async (req, res) => {
  const { name, description, pricePerDay, address, images } = req.body;

  try {
    const item = new Item({
      name,
      description,
      pricePerDay,
      address,
      images,
      ownerId: req.user.id
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

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

// >>> SỬA 3: Bỏ 'exports.'
const updateItem = async (req, res) => {
  const { name, description, pricePerDay, address, images, status } = req.body;
  const item = req.item; 

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

// >>> SỬA 4: Bỏ 'exports.'
const deleteItem = async (req, res) => {
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

// >>> SỬA 5: Xóa dòng `module.exports.checkOwner = checkOwner;`
// và thay thế bằng một export duy nhất ở cuối file.
module.exports = {
  searchItems,
  createItem,
  updateItem,
  deleteItem,
  checkOwner
};