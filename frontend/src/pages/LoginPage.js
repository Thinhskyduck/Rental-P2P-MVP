import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Login</h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      {/* Checkout Page Start */}
      <div className="container-fluid bg-light overflow-hidden py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.1s">
              <form>
                <div className="form-item">
                  <label className="form-label my-3">Email Address<sup>*</sup></label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Password<sup>*</sup></label>
                  <input type="password" className="form-control" />
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button type="button" className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                    Login
                  </button>
                  <Link to="/register" className="mt-3">Don't have an account? Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Checkout Page End */}
    </>
  );
}

export default LoginPage;