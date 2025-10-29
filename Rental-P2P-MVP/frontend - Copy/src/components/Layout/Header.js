import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; 

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid px-5 d-none border-bottom d-lg-block">
        <div className="row gx-0 align-items-center">
          
          {/* SỬA PHẦN NÀY: Xóa các link <a> vô dụng */}
          <div className="col-lg-4 text-center text-lg-start mb-lg-0">
            <div className="d-inline-flex align-items-center" style={{height: '45px'}}>
                <span className="text-muted me-2">Help</span><small> / </small>
                <span className="text-muted mx-2">Support</span><small> / </small>
                <span className="text-muted ms-2">Contact</span>
            </div>
          </div>
          <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
              <small className="text-dark">Call Us:</small>
              {/* SỬA PHẦN NÀY: Xóa thẻ <a> */}
              <span className="text-muted ms-2">(+012) 1234 567890</span>
          </div>
          {/* HẾT PHẦN SỬA */}

          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
              {/* ... (Dropdown USD, English giữ nguyên nếu có) ... */}
              <div className="dropdown">
                
                {/* SỬA PHẦN NÀY: Xóa href="#!", thêm role="button" */}
                <a className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown" role="button" aria-expanded="false" style={{ cursor: 'pointer' }}>
                  <small><i className="fa fa-user me-2"></i> {isLoggedIn && user ? user.fullName : 'My Account'}</small>
                </a>
                {/* HẾT PHẦN SỬA */}

                <div className="dropdown-menu rounded">
                  {isLoggedIn && user ? (
                    <>
                      <span className="dropdown-item-text">Xin chào, {user.fullName}</span>
                      <hr className="dropdown-divider" />
                      {/* CÁC NÚT BẠN TÌM ĐANG Ở ĐÂY */}
                      <Link to="/my-rentals" className="dropdown-item">My Rentals</Link>
                      <Link to="/post-item" className="dropdown-item">Post New Item</Link>
                      <hr className="dropdown-divider" />
                      <button onClick={handleLogout} className="dropdown-item">Log Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item">Login</Link>
                      <Link to="/register" className="dropdown-item">Register</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* (Phần còn lại của Header giữ nguyên) */}
      <div className="container-fluid px-5 py-4 d-none d-lg-block">
         <div className="row gx-0 align-items-center text-center">
            <div className="col-md-4 col-lg-3 text-center text-lg-start">
                <div className="d-inline-flex align-items-center">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="display-5 text-primary m-0"><i
                                className="fas fa-sync-alt text-secondary me-2"></i>RentalP2P</h1>
                    </Link>
                </div>
            </div>
            <div className="col-md-4 col-lg-6 text-center">
            </div>
            <div className="col-md-4 col-lg-3 text-center text-lg-end">
            </div>
         </div>
      </div>
      
      <div className="container-fluid nav-bar p-0">
            <div className="row gx-0 bg-primary px-5 align-items-center">
                <div className="col-lg-3 d-none d-lg-block">
                    <nav className="navbar navbar-light position-relative" style={{width: '250px'}}>
                        <button className="navbar-toggler border-0 fs-4 w-100 px-0 text-start" type="button"
                            data-bs-toggle="collapse" data-bs-target="#allCat">
                            <h4 className="m-0"><i className="fa fa-bars me-2"></i>All Categories</h4>
                        </button>
                        <div className="collapse navbar-collapse rounded-bottom" id="allCat">
                            <div className="navbar-nav ms-auto py-0">
                                <ul className="list-unstyled categories-bars">
                                    {/* SỬA: Xóa href="#!" */}
                                    <li><div className="categories-bars-item"><span className="text-dark">Đồ điện tử</span><span>(0)</span></div></li>
                                    <li><div className="categories-bars-item"><span className="text-dark">Dụng cụ gia đình</span><span>(0)</span></div></li>
                                    <li><div className="categories-bars-item"><span className="text-dark">Đồ cắm trại</span><span>(0)</span></div></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-12 col-lg-9">
                    <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                        <Link to="/" className="navbar-brand d-block d-lg-none">
                            <h1 className="display-5 text-secondary m-0"><i
                                    className="fas fa-sync-alt text-white me-2"></i>RentalP2P</h1>
                        </Link>
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars fa-1x"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
      {/* Navbar End */}
    </>
  );
}

export default Header;