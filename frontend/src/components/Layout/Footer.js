import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div className="container py-5">
          {/* ... (Copy HTML Footer từ template và chuyển thành JSX) ... */}
          {/* Ví dụ thay đổi link */}
           <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                    <h4 className="text-primary mb-4">RentalP2P</h4> {/* Đổi tên */}
                    <Link to="/about" className=""><i className="fas fa-angle-right me-2"></i> About Us</Link> {/* Thay đổi */}
                    <Link to="/contact" className=""><i className="fas fa-angle-right me-2"></i> Contact Us</Link> {/* Thay đổi */}
                    {/* ... Các link khác nếu có ... */}
                </div>
            </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Copyright Start */}
      <div className="container-fluid copyright py-4">
         {/* ... (Copy HTML Copyright từ template và chuyển thành JSX) ... */}
          <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-white"><Link to="/" className="border-bottom text-white"><i
                          className="fas fa-copyright text-light me-2"></i>RentalP2P</Link>, All right reserved.</span> {/* Thay đổi */}
          </div>
      </div>
      {/* Copyright End */}
    </>
  );
}

export default Footer;