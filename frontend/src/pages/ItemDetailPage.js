import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ItemDetailPage() {
  const { itemId } = useParams(); // Lấy itemId từ URL

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Item Details</h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
          <li className="breadcrumb-item active text-white">Item Detail</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      {/* Single Products Start */}
      <div className="container-fluid shop py-5">
        <div className="container py-5">
          <p>Details for item {itemId} will load here from /api/views/item-details/{itemId}</p>
          {/* ... (Toàn bộ nội dung của trang single.html sẽ được convert và đưa vào đây) ... */}
        </div>
      </div>
      {/* Single Products End */}
    </>
  );
}

export default ItemDetailPage;