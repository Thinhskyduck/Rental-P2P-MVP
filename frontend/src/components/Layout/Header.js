import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Header() {
  // TODO: Lấy trạng thái đăng nhập từ Context sau này
  const isLoggedIn = false;
  const userName = "User Name"; // Lấy từ Context

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid px-5 d-none border-bottom d-lg-block">
        {/* ... (Copy HTML Topbar từ template và chuyển thành JSX) ... */}
        {/* Ví dụ thay đổi cho My Dashboard */}
         <div className="col-lg-4 text-center text-lg-end">
            <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                {/* ... (Dropdown USD, English) ... */}
                <div className="dropdown">
                    <a href="#" className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown">
                       <small><i className="fa fa-user me-2"></i> {isLoggedIn ? userName : 'My Account'}</small> {/* Thay đổi ở đây */}
                    </a>
                    <div className="dropdown-menu rounded">
                        {isLoggedIn ? (
                            <>
                                <Link to="/my-rentals" className="dropdown-item">My Rentals</Link>
                                <Link to="/post-item" className="dropdown-item">Post New Item</Link>
                                {/* <a href="#" className="dropdown-item">Notifications</a>
                                <a href="#" className="dropdown-item">Account Settings</a> */}
                                <hr className="dropdown-divider" />
                                <button onClick={() => { /* TODO: Implement Logout */ alert('Logout clicked'); }} className="dropdown-item">Log Out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="dropdown-item">Login</Link>
                                <Link to="/register" className="dropdown-item">Register</Link>
                            </>
                        )}
                        {/* <a href="#" className="dropdown-item"> Wishlist</a> */}
                        {/* <a href="#" className="dropdown-item"> My Card</a> */}
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="container-fluid px-5 py-4 d-none d-lg-block">
            {/* ... (Copy HTML phần Logo, Search, Cart từ template và chuyển thành JSX) ... */}
            {/* Ví dụ thay Logo bằng Link */}
             <div className="col-md-4 col-lg-3 text-center text-lg-start">
                <div className="d-inline-flex align-items-center">
                    <Link to="/" className="navbar-brand p-0"> {/* Thay đổi ở đây */}
                        <h1 className="display-5 text-primary m-0"><i
                                className="fas fa-sync-alt text-secondary me-2"></i>RentalP2P</h1> {/* Đổi tên App */}
                    </Link>
                </div>
            </div>
            {/* ... Phần Search và Cart ... */}
             <div className="col-md-4 col-lg-3 text-center text-lg-end">
                <div className="d-inline-flex align-items-center">
                    {/* <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3"><span
                            className="rounded-circle btn-md-square border"><i className="fas fa-random"></i></span></a>
                    <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3"><span
                            className="rounded-circle btn-md-square border"><i className="fas fa-heart"></i></span></a> */}
                    {/* <Link to="/cart" className="text-muted d-flex align-items-center justify-content-center"> Cart bỏ qua trong MVP này
                       <span className="rounded-circle btn-md-square border"><i className="fas fa-shopping-cart"></i></span>
                       <span className="text-dark ms-2">$0.00</span>
                    </Link> */}
                </div>
            </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid nav-bar p-0">
            <div className="row gx-0 bg-primary px-5 align-items-center">
                <div className="col-lg-3 d-none d-lg-block">
                     {/* ... (Phần All Categories dropdown tĩnh) ... */}
                </div>
                <div className="col-12 col-lg-9">
                    <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                        <Link to="/" className="navbar-brand d-block d-lg-none"> {/* Thay đổi ở đây */}
                            <h1 className="display-5 text-secondary m-0"><i
                                    className="fas fa-sync-alt text-white me-2"></i>RentalP2P</h1>
                        </Link>
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars fa-1x"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <Link to="/" className="nav-item nav-link">Home</Link> {/* Thay đổi ở đây */}
                                <Link to="/shop" className="nav-item nav-link">Shop</Link> {/* Thay đổi ở đây */}
                                {/* <Link to="/single" className="nav-item nav-link">Single Page</Link> */} {/* Bỏ link tĩnh */}
                                {/* <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0">
                                        <Link to="/bestseller" className="dropdown-item">Bestseller</Link> Bỏ
                                        <Link to="/cart" className="dropdown-item">Cart Page</Link> Bỏ
                                        <Link to="/checkout" className="dropdown-item">Checkout</Link> Bỏ
                                        <Link to="/404" className="dropdown-item">404 Page</Link> Có thể dùng
                                    </div>
                                </div> */}
                                {/* <Link to="/contact" className="nav-item nav-link me-2">Contact</Link> Bỏ */}
                                 {/* ... (Phần All Categories dropdown cho mobile) ... */}
                            </div>
                            {/* <a href="" className="btn btn-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"><i
                                    className="fa fa-mobile-alt me-2"></i> +0123 456 7890</a> */}
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