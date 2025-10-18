// (Tạo thư mục 'config' rồi tạo file 'db.js' bên trong)
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Thoát tiến trình nếu không kết nối được DB
    process.exit(1);
  }
};

module.exports = connectDB;