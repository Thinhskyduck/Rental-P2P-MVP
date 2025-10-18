import React from 'react';
import { Link } from 'react-router-dom'; // Import Link để điều hướng

function HomePage() {
  // Lưu ý: Các file ảnh như /img/carousel-1.png phải nằm trong thư mục `frontend/public/img/`
  return (
    <>
      {/* Carousel Start */}
      <div className="container-fluid carousel bg-light px-0">
        <div className="row g-0 justify-content-end">
          <div className="col-12 col-lg-7 col-xl-9">
            <div className="header-carousel owl-carousel bg-light py-5">
              <div className="row g-0 header-carousel-item align-items-center">
                <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                  <img src="/img/carousel-1.png" className="img-fluid w-100" alt="Carousel 1" />
                </div>
                <div className="col-xl-6 carousel-content p-4">
                  <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s" style={{ letterSpacing: '3px' }}>
                    Cho thuê mọi thứ
                  </h4>
                  <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">
                    Nền tảng cho thuê P2P
                  </h1>
                  <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">
                    Vật dụng bạn không dùng, là thứ người khác đang cần!
                  </p>
                  <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s" to="/shop">
                    Xem ngay
                  </Link>
                </div>
              </div>
              <div className="row g-0 header-carousel-item align-items-center">
                <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                  <img src="/img/carousel-2.png" className="img-fluid w-100" alt="Carousel 2" />
                </div>
                <div className="col-xl-6 carousel-content p-4">
                  <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s" style={{ letterSpacing: '3px' }}>
                    Tiết kiệm chi phí
                  </h4>
                  <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">
                    Thuê thay vì mua
                  </h1>
                  <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">
                    Sử dụng các vật dụng chất lượng với giá chỉ bằng một phần nhỏ.
                  </p>
                  <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s" to="/shop">
                    Khám phá
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-xl-3 wow fadeInRight" data-wow-delay="0.1s">
            <div className="carousel-header-banner h-100">
              <img src="/img/header-img.jpg" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} alt="Header Banner" />
              <div className="carousel-banner-offer">
                <p className="bg-primary text-white rounded fs-5 py-2 px-4 mb-0 me-3">Giảm 20%</p>
                <p className="text-primary fs-5 fw-bold mb-0">Ưu đãi Đặc biệt</p>
              </div>
              <div className="carousel-banner">
                <div className="carousel-banner-content text-center p-4">
                  <span className="d-block mb-2">Máy Ảnh</span> {/* Đã sửa <a> thành <span> */}
                  <span className="d-block text-white fs-3">Canon EOS 70D</span> {/* Đã sửa <a> thành <span> */}
                  <del className="me-2 text-white fs-5">500.000đ/ngày</del>
                  <span className="text-primary fs-5">400.000đ/ngày</span>
                </div>
                {/* Tạm thời giả lập link đến item 1 */}
                <Link to="/items/1" className="btn btn-primary rounded-pill py-2 px-4"><i className="fas fa-shopping-cart me-2"></i> Thuê ngay</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}

      {/* Searvices Start */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-6 col-md-4 col-lg-2 border-start border-end wow fadeInUp" data-wow-delay="0.1s">
            <div className="p-4">
              <div className="d-inline-flex align-items-center">
                <i className="fa fa-sync-alt fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">Minh bạch</h6>
                  <p className="mb-0">Đánh giá từ cộng đồng</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.2s">
            <div className="p-4">
              <div className="d-flex align-items-center">
                <i className="fab fa-telegram-plane fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">An toàn</h6>
                  <p className="mb-0">Xác thực người dùng</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.3s">
            <div className="p-4">
              <div className="d-flex align-items-center">
                <i className="fas fa-life-ring fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">Hỗ trợ 24/7</h6>
                  <p className="mb-0">Chúng tôi luôn ở đây</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.4s">
            <div className="p-4">
              <div className="d-flex align-items-center">
                <i className="fas fa-credit-card fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">Tiện lợi</h6>
                  <p className="mb-0">Thanh toán (mô phỏng)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.5s">
            <div className="p-4">
              <div className="d-flex align-items-center">
                <i className="fas fa-lock fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">Bảo mật</h6>
                  <p className="mb-0">Bảo mật thông tin của bạn</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.6s">
            <div className="p-4">
              <div className="d-flex align-items-center">
                <i className="fas fa-blog fa-2x text-primary"></i>
                <div className="ms-4">
                  <h6 className="text-uppercase mb-2">Cộng đồng</h6>
                  <p className="mb-0">Chia sẻ và kết nối</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Searvices End */}

      {/* Products Offer Start */}
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
              <Link to="/shop?search=camera" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                <div>
                  <p className="text-muted mb-3">Tìm máy ảnh tốt nhất!</p>
                  <h3 className="text-primary">Máy ảnh</h3>
                  <h1 className="display-3 text-secondary mb-0">40% <span className="text-primary fw-normal">Off</span></h1>
                </div>
                <img src="/img/product-1.png" className="img-fluid" alt="Product 1" />
              </Link>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3s">
              <Link to="/shop?search=watch" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                <div>
                  <p className="text-muted mb-3">Tìm đồng hồ tốt nhất!</p>
                  <h3 className="text-primary">Đồng hồ</h3>
                  <h1 className="display-3 text-secondary mb-0">20% <span className="text-primary fw-normal">Off</span></h1>
                </div>
                <img src="/img/product-2.png" className="img-fluid" alt="Product 2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Products Offer End */}

      {/* Our Products Start */}
      <div className="container-fluid product py-5">
        <div className="container py-5">
          <div className="tab-class">
            <div className="row g-4">
              <div className="col-lg-4 text-start wow fadeInLeft" data-wow-delay="0.1s">
                <h1>Vật dụng cho thuê</h1>
              </div>
              {/* (Các tab lọc tạm thời ẩn đi) */}
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <p className='text-center fs-4'>[Danh sách sản phẩm sẽ được tải từ API ở bước sau]</p>
                {/* Chúng ta sẽ tạo một component ProductList và ProductCard 
                  để fetch và hiển thị dữ liệu động từ API ở bước sau.
                  Giờ chỉ cần placeholder.
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Products End */}
    </>
  );
}

export default HomePage;