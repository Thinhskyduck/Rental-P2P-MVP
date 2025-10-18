import React from 'react';
import { Link, useParams } from 'react-router-dom';

function PostItemPage() {
  const { itemId } = useParams();
  const isEditMode = Boolean(itemId);

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">
          {isEditMode ? 'Edit Your Item' : 'Post New Item'}
        </h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">
            {isEditMode ? 'Edit Item' : 'Post Item'}
          </li>
        </ol>
      </div>
      {/* Single Page Header End */}

      <div className="container py-5">
        <p>Form to create or edit an item will go here.</p>
        <p>This page will be protected and requires login.</p>
      </div>
    </>
  );
}

export default PostItemPage;