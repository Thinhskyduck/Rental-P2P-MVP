import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api'; // <--- SỬ DỤNG FILE CỦA BẠN

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      // 1. Gọi hàm login từ apiService để lấy token
      const loginResponse = await apiService.login(data.email, data.password);
      const { token, user  } = loginResponse.data;

      if (!token || !user) {
        throw new Error('Phản hồi từ server không hợp lệ');
      }
      

     // Cập nhật AuthContext với dữ liệu đã có
      login(user, token);

      // 4. Chuyển hướng về trang chủ
      navigate('/');

    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        setApiError('Email hoặc mật khẩu không chính xác.');
      } else {
        setApiError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Đăng Nhập</h1>
        <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
          <li className="breadcrumb-item"><Link to="/">Trang Chủ</Link></li>
          <li className="breadcrumb-item active text-white">Đăng Nhập</li>
        </ol>
      </div>

      {/* Login Form */}
      <div className="container-fluid bg-light py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-white p-4 p-md-5 rounded">
                <h3 className="mb-4 text-center">Đăng nhập tài khoản</h3>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  {apiError && (
                    <div className="alert alert-danger" role="alert">
                      {apiError}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Địa chỉ Email<sup>*</sup></label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Nhập email của bạn"
                      {...register('email', { 
                        required: 'Email là bắt buộc',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Định dạng email không hợp lệ"
                        }
                      })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mật khẩu<sup>*</sup></label>
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Nhập mật khẩu"
                      {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>

                  <div className="mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 py-3"
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </button>
                    <p className="text-center mt-3">
                      Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;