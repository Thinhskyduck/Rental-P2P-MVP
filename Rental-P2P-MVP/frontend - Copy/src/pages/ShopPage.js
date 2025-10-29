import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ItemList from '../components/Items/ItemList'; // <-- 1. IMPORT

function ShopPage() {
  // Đọc query search từ URL, ví dụ: /shop?search=camera
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Shop Page</h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><span className="text-white">Pages</span></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      {/* Shop Page Start */}
      <div className="container-fluid shop py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
              {/* (Sidebar Lọc sẽ ở đây - Tạm thời để trống) */}
              <h4>Filters</h4>
              <p>Search filters will go here.</p>
            </div>
            <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
              {/* 2. THAY THẾ PLACEHOLDER BẰNG ITEMLIST */}
              <ItemList searchQuery={query} />
            </div>
          </div>
        </div>
      </div>
      {/* Shop Page End */}
    </>
  );
}

export default ShopPage;