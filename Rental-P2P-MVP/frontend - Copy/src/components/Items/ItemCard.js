import React from 'react';
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  // SỬA LỖI Ở ĐÂY:
  // Đọc từ `item.mainImage` (từ API) thay vì `item.images`
  const imageUrl = item.mainImage || 'https://via.placeholder.com/300x300.png?text=No+Image';

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
        <div className="product-item-inner border rounded">
          <div className="product-item-inner-item">
            <img 
              src={imageUrl} // Sử dụng imageUrl đã sửa
              className="img-fluid w-100 rounded-top" 
              alt={item.name} 
              style={{ height: '250px', objectFit: 'cover' }} 
            />
            {/* <div className="product-new">New</div> */}
            <div className="product-details">
              <Link to={`/items/${item._id}`} className="text-white"><i className="fa fa-eye fa-1x"></i></Link>
            </div>
          </div>
          <div className="text-center rounded-bottom p-4">
            <span className="d-block mb-2">{item.category || 'Category'}</span>
            <Link to={`/items/${item._id}`} className="d-block h4">{item.name}</Link>
            <span className="text-primary fs-5">{item.pricePerDay}đ/ngày</span>
          </div>
        </div>
        <div className="product-item-add border border-top-0 rounded-bottom text-center p-4 pt-0">
          <Link to={`/items/${item._id}`} className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4">
            <i className="fas fa-shopping-cart me-2"></i> Thuê ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;