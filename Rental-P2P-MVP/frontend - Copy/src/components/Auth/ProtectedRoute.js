import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Nếu đang trong quá trình kiểm tra token (tải lại trang)
    // Hiển thị spinner thay vì trang
    // (Chúng ta cần sửa lại Spinner.js một chút để nó không "show" vĩnh viễn)
    // Tạm thời chỉ return null hoặc một spinner đơn giản
     return <div className="container py-5 text-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    // Nếu không đăng nhập, chuyển hướng (Navigate) về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component con (trang MyRentals, PostItem...)
  return <Outlet />;
}

export default ProtectedRoute;