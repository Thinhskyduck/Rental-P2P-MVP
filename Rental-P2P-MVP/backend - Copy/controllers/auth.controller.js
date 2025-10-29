const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Hàm trợ giúp để tạo token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token hết hạn sau 30 ngày
  });
};

// POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      // Các trường khác như sđt, địa chỉ sẽ được cập nhật ở profile
    });

    // Chúng ta không trả về token ở đây theo spec (chỉ 201)
    // Nếu muốn user tự động login sau khi đăng ký, bạn có thể trả về token
    res.status(201).json({
      message: 'User registered successfully',
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });

  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.isBanned) {
        return res.status(401).json({ message: 'This account is banned.' });
      }
      // SỬA LẠI CHỖ NÀY:
      // Gửi về cả token và thông tin user
      res.status(200).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/auth/me (Endpoint mới để lấy thông tin user từ token)
exports.getMe = async (req, res) => {
  // req.user đã được gán bởi middleware 'protect'
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// POST /api/auth/logout
// Lưu ý: Logout với JWT ở phía server thực ra rất khó
// Cách 1 (Đơn giản - Client tự xóa token):
exports.logoutUser = (req, res) => {
  // Phía client chỉ cần xóa token khỏi localStorage/cookie
  res.status(200).json({ message: 'Logout successful' });
};
// Cách 2 (Phức tạp - Blacklist token): Cần dùng Redis để lưu token đã logout.
// Với MVP, chúng ta chọn cách 1.