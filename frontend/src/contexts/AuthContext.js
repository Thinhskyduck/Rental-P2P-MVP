import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Tạo Provider (Component "Nhà cung cấp")
// Component này sẽ bọc toàn bộ ứng dụng của chúng ta
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Lấy token từ localStorage khi tải lại trang
  const [loading, setLoading] = useState(true); // Thêm state loading để xử lý việc kiểm tra token ban đầu

  useEffect(() => {
    // Kiểm tra xem có token trong localStorage không
    // Nếu có, chúng ta CÓ THỂ fetch thông tin user từ API (ví dụ: /api/auth/me)
    // Nhưng trong MVP này, ta giả định token còn hạn là user đã đăng nhập.
    // Ta sẽ decode token (hoặc đơn giản là set 1 user giả) nếu token tồn tại.

    if (token) {
      // TODO: Lý tưởng nhất là gọi API để lấy thông tin user thật từ token
      // Ví dụ: api.get('/auth/me').then(res => setUser(res.data))...

      // Tạm thời, ta chỉ cần set 1 user "đã đăng nhập" nếu có token
      setUser({ email: 'user@example.com', fullName: 'Logged In User' }); // User giả
    }
    setLoading(false); // Hoàn tất kiểm tra
  }, [token]);

  // Hàm Đăng nhập: Lưu token và user
  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
  };

  // Hàm Đăng xuất: Xóa token và user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Giá trị (value) mà chúng ta muốn chia sẻ
  const value = {
    user,
    token,
    isLoggedIn: !!user, // True nếu user tồn tại, false nếu là null
    loading,
    login,
    logout,
  };

  // 3. Trả về Provider bọc các 'children' (là App của chúng ta)
  // Chúng ta không render gì cho đến khi hoàn tất việc kiểm tra token
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 4. Tạo một custom Hook (useAuth) để dễ dàng sử dụng
// Thay vì phải import useContext và AuthContext ở mọi nơi
export const useAuth = () => {
  return useContext(AuthContext);
};