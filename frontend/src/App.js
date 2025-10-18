import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; // File CSS trống

// Import components (sẽ tạo ở bước sau)
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Spinner from './components/Common/Spinner'; // Component Spinner
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyRentalsPage from './pages/MyRentalsPage';
import PostItemPage from './pages/PostItemPage';
import NotFoundPage from './pages/NotFoundPage';
// import ProtectedRoute from './components/Auth/ProtectedRoute'; // Sẽ dùng sau

function App() {
  // Tạm thời hiển thị Spinner (nếu cần)
  // const isLoading = false; // Thay đổi state này khi gọi API
  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      {/* Spinner luôn render nhưng ẩn/hiện bằng CSS của template */}
      <Spinner />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/items/:itemId" element={<ItemDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Các Route cần đăng nhập (sẽ bảo vệ sau) */}
        <Route path="/my-rentals" element={<MyRentalsPage />} />
        <Route path="/post-item" element={<PostItemPage />} />
        <Route path="/edit-item/:itemId" element={<PostItemPage />} /> {/* Dùng chung component để sửa */}

        {/* Route cho trang 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      {/* Back to Top button (từ template) */}
      <a href="#" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
    </>
  );
}

export default App;