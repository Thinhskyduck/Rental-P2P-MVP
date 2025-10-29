import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

// Import components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Spinner from './components/Common/Spinner'; 
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyRentalsPage from './pages/MyRentalsPage';
import PostItemPage from './pages/PostItemPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/Auth/ProtectedRoute'; // <-- 1. IMPORT

function App() {
  return (
    <>
      <Spinner />
      <Header />
      <Routes>
        {/* Routes công khai */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/items/:itemId" element={<ItemDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* 2. Cấu hình Routes cần bảo vệ */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-rentals" element={<MyRentalsPage />} />
          <Route path="/post-item" element={<PostItemPage />} />
          <Route path="/edit-item/:itemId" element={<PostItemPage />} />
          {/* Thêm bất kỳ route nào cần login vào đây */}
        </Route>

      </Routes>
      <Footer />

      {/* Back to Top button (từ template) */}
      <a href="#!" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
    </>
  );
}

export default App;