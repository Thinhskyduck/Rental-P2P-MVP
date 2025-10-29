import axios from 'axios';

// 1. Tạo một instance của axios
const api = axios.create({
  // Lấy URL của backend từ file .env của React (nếu có)
  // Hoặc hardcode (cho mục đích học thuật)
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Thiết lập Interceptor (can thiệp)
// Đây là phần quan trọng: Nó sẽ tự động thêm token vào *mọi* request
// mà không cần chúng ta phải làm thủ công ở từng trang.
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Nếu có token, thêm vào header Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Trả về config đã chỉnh sửa
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

/* ===============================================================
 * Định nghĩa tất cả các hàm gọi API ở đây
 * =============================================================== */

// === Auth ===
export const login = (email, password) => 
  api.post('/auth/login', { email, password });

export const register = (fullName, email, password) => 
  api.post('/auth/register', { fullName, email, password });

// (Chúng ta có thể thêm hàm /auth/me để lấy thông tin user từ token)
// export const getMe = () => api.get('/auth/me'); // Cần backend hỗ trợ

// === Items ===
export const getItems = (searchQuery = '') => 
  api.get(`/items?search=${searchQuery}`);

export const createItem = (itemData) => 
  api.post('/items', itemData); // Cần formData nếu có upload ảnh

export const updateItem = (itemId, itemData) => 
  api.put(`/items/${itemId}`, itemData);

export const deleteItem = (itemId) => 
  api.delete(`/items/${itemId}`);

// === Views (BFF) ===
export const getItemDetails = (itemId) => 
  api.get(`/views/item-details/${itemId}`);

export const getMyRentals = () => 
  api.get('/views/my-rentals'); // Đã tự động đính kèm token

// === Rentals (Actions) ===
export const createRentalRequest = (itemId, startDate, endDate, note) =>
  api.post('/rentals', { itemId, startDate, endDate, note});

export const confirmRental = (rentalId) =>
  api.patch(`/rentals/${rentalId}/confirm`);

export const rejectRental = (rentalId) =>
  api.patch(`/rentals/${rentalId}/reject`);

export const completeRental = (rentalId) =>
  api.patch(`/rentals/${rentalId}/complete`);

export const getMe = () => api.get('/auth/me'); // Định nghĩa hàm
// === Upload (MỚI) ===
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);

  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Quan trọng
    },
  });
};

// Export default object chứa tất cả các hàm
const apiService = {
  login,
  register,
  uploadImage,
  getMe,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemDetails,
  getMyRentals,
  createRentalRequest,
  confirmRental,
  rejectRental,
  completeRental,
};

export default apiService;
export { api };