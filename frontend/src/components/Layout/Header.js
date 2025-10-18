import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link và useNavigate
import { useAuth } from '../../contexts/AuthContext'; // <-- 1. Import useAuth

function Header() {
  // 2. Lấy state và hàm từ AuthContext
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Chuyển hướng về trang login sau khi logout
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid px-5 d-none border-bottom d-lg-block">
        <div className="row gx-0 align-items-center">
          {/* ... (Phần bên trái 'Help / Support') ... */}
          <div className="col-lg-4 text-center text-lg-start mb-lg-0">
              {/* ... */}
          </div>
          <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
              {/* ... */}
          </div>

          {/* Ví dụ thay đổi cho My Dashboard */}
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
              {/* ... (Dropdown USD, English) ... */}
              <div className="dropdown">
                <a href="#!" className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown">
                  {/* 3. Sử dụng state */}
                  <small><i className="fa fa-user me-2"></i> {isLoggedIn ? user.fullName : 'My Account'}</small>
                </a>
                <div className="dropdown-menu rounded">
                  {isLoggedIn ? (
                    <>
                      <span className="dropdown-item-text">Xin chào, {user.fullName}</span>
                      <hr className="dropdown-divider" />
                      <Link to="/my-rentals" className="dropdown-item">My Rentals</Link>
                      <Link to="/post-item" className="dropdown-item">Post New Item</Link>
                      <hr className="dropdown-divider" />
                      {/* 4. Gắn hàm logout */}
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

      {/* ... (Phần còn lại của Header: Logo, Search, Navbar...) ... */}
      {/* (Giữ nguyên như code ở Bước 1) */}
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
            {/* ... Phần Search (Sẽ làm sau) ... */}
            <div className="col-md-4 col-lg-6 text-center">
                {/* <div className="position-relative ps-4">
                    <div className="d-flex border rounded-pill">
                        <input className="form-control border-0 rounded-pill w-100 py-3" type="text" placeholder="Search Looking For?"/>
                        <button type="button" className="btn btn-primary rounded-pill py-3 px-5" style={{"border": 0}}><i className="fas fa-search"></i></button>
                    </div>
                </div> */}
            </div>
            <div className="col-md-4 col-lg-3 text-center text-lg-end">
                {/* ... (Phần Cart bỏ qua) ... */}
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
                                    {/* (Tạm thời để tĩnh) */}
                                    <li><div className="categories-bars-item"><a href="#!">Đồ điện tử</a><span>(5)</span></div></li>
                                    <li><div className="categories-bars-item"><a href="#!">Dụng cụ gia đình</a><span>(8)</span></div></li>
                                    <li><div className="categories-bars-item"><a href="#!">Đồ cắm trại</a><span>(2)</span></div></li>
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