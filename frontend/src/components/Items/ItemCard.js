// frontend/src/components/Items/ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  const imageUrl = item.mainImage || 'https://via.placeholder.com/300x300.png?text=No+Image';

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div 
        className="product-item rounded h-100 shadow-sm transition"
        style={{ overflow: 'hidden', border: '1px solid #eee' }}
      >
        <div className="product-item-inner d-flex flex-column h-100">

          {/* Hình ảnh */}
          <div className="position-relative">
            <img 
              src={imageUrl}
              alt={item.name}
              className="img-fluid w-100"
              style={{ height: '230px', objectFit: 'cover' }}
            />
            
            {/* Overlay icon xem chi tiết */}
            <Link 
              to={`/items/${item._id}`}
              className="position-absolute top-50 start-50 translate-middle 
                        d-flex align-items-center justify-content-center
                        bg-primary text-white rounded-circle"
              style={{ width: 48, height: 48, opacity: 0, transition: '0.3s' }}
            >
              <i className="fa fa-eye"></i>
            </Link>
          </div>

          {/* Nội dung */}
          <div className="text-center p-3 d-flex flex-column flex-grow-1">

            {/* Tên & Giá */}
            <div className="flex-grow-1">
              <Link 
                to={`/items/${item._id}`}
                className="d-block fw-semibold text-dark mb-2"
                style={{
                  textDecoration: 'none',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
                title={item.name}
              >
                {item.name}
              </Link>

              <div className="fw-bold text-primary">
                {item.pricePerDay.toLocaleString('vi-VN')} đ/ngày
              </div>
            </div>

            {/* Nút */}
            <div className="mt-auto pt-3">
              <Link 
                to={`/items/${item._id}`} 
                className="btn btn-primary rounded-pill px-4 py-2 w-100 shadow-sm"
              >
                Thuê ngay
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Hover effect */}
      <style>
        {`
          .product-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          }
          .product-item:hover img {
            filter: brightness(0.9);
          }
          .product-item:hover a.position-absolute {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
}

export default ItemCard;
