import React from 'react';
import { Link } from 'react-router-dom';

function MyRentalsPage() {
  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">My Rentals</h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">My Rentals</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      <div className="container py-5">
        <p>My Rentals content will go here (As Renter / As Owner).</p>
        <p>This page will be protected and requires login.</p>
      </div>
    </>
  );
}

export default MyRentalsPage;