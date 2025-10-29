import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function PostItemPage() {
  const { itemId } = useParams();
  const isEditMode = Boolean(itemId);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  // State mới để quản lý ảnh
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // Để xem trước ảnh
  const [uploading, setUploading] = useState(false); // State khi đang upload ảnh

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (isEditMode) {
      const fetchItemData = async () => {
        try {
          const response = await apiService.getItemDetails(itemId);
          const item = response.data;

          // Giả định user.email là duy nhất. Tốt hơn nên dùng user._id
          if (!user || user.email !== item.owner.email) {
             setApiError("You don't have permission to edit this item.");
             setPageLoading(false);
             return;
          }

          // Điền dữ liệu vào form
          setValue('name', item.name);
          setValue('description', item.description);
          setValue('pricePerDay', item.pricePerDay);
          setValue('address', item.address);

          // Set ảnh đầu tiên (nếu có) để xem trước
          if (item.images && item.images.length > 0) {
            setImageUrl(item.images[0]);
          }

        } catch (err) {
          setApiError('Failed to load item data.');
        }
        setPageLoading(false);
      };
      fetchItemData();
    }
  }, [itemId, isEditMode, setValue, user]);

  // Hàm xử lý khi chọn file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Tạo URL tạm thời để xem trước
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // Xử lý khi nhấn nút Submit
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    let finalImageUrl = imageUrl; // Lấy ảnh đã có (trong edit mode)

    try {
      // 1. Nếu có file mới, upload nó trước
      if (imageFile) {
        setUploading(true);
        const uploadResponse = await apiService.uploadImage(imageFile);
        finalImageUrl = uploadResponse.data.imageUrl; // Lấy URL từ Cloudinary
        setUploading(false);
      }

      // 2. Tạo/Cập nhật vật phẩm với URL ảnh
      const itemData = {
        ...data,
        images: finalImageUrl ? [finalImageUrl] : [] // Backend mong chờ một mảng
      };

      if (isEditMode) {
        await apiService.updateItem(itemId, itemData);
        alert('Item updated successfully!');
        navigate(`/items/${itemId}`);
      } else {
        if (!finalImageUrl) {
          setApiError('Please upload an image.');
          setLoading(false);
          return;
        }
        await apiService.createItem(itemData);
        alert('Item created successfully!');
        navigate('/shop');
      }

    } catch (err) {
      setApiError('An error occurred. Please try again.');
      console.error(err);
      setLoading(false);
      setUploading(false);
    }
  };

  if (pageLoading) {
    return <div className="container py-5 text-center">Loading item data...</div>;
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
         {/* ... (Header) ... */}
      </div>

      <div className="container-fluid bg-light overflow-hidden py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8 col-xl-8 wow fadeInUp" data-wow-delay="0.1s">

              <form onSubmit={handleSubmit(onSubmit)}>
                {apiError && (
                  <div className="alert alert-danger" role="alert">{apiError}</div>
                )}

                {/* (Các trường Name, Description, Price, Address giữ nguyên...) */}
                 <div className="form-item mb-3">
                  <label className="form-label my-3">Item Name<sup>*</sup></label>
                  <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: 'Item name is required' })} />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="form-item mb-3">
                  <label className="form-label my-3">Description</label>
                  <textarea className="form-control" rows="5" {...register('description')}></textarea>
                </div>
                <div className="form-item mb-3">
                  <label className="form-label my-3">Price per Day (VND)<sup>*</sup></label>
                  <input type="number" className={`form-control ${errors.pricePerDay ? 'is-invalid' : ''}`} {...register('pricePerDay', { required: 'Price is required', valueAsNumber: true })} />
                  {errors.pricePerDay && <div className="invalid-feedback">{errors.pricePerDay.message}</div>}
                </div>
                <div className="form-item mb-3">
                  <label className="form-label my-3">Address (Pickup Location)<sup>*</sup></label>
                  <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} {...register('address', { required: 'Address is required' })} />
                  {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                </div>

                {/* SỬA LẠI PHẦN UPLOAD ẢNH */}
                <div className="form-item mb-3">
                  <label className="form-label my-3">Image<sup>*</sup></label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imageUrl && (
                    <div className="mt-3">
                      <img src={imageUrl} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                    </div>
                  )}
                  {uploading && <div className="text-muted mt-2">Uploading image...</div>}
                </div>

                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    disabled={loading || uploading}
                  >
                    {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Post Item')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItemPage;