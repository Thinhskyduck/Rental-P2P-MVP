import React from 'react';

function Spinner() {
  // Class "show" sẽ bị remove bởi main.js của template khi load xong
  // Hoặc bạn có thể quản lý state loading trong React để thêm/bỏ class này
  return (
    <div id="spinner" className=" bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;