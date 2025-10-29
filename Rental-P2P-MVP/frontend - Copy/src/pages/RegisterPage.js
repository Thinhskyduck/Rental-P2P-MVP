import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiService from '../services/api'; // Import apiService

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      // 1. Gọi API register
      await apiService.register(data.fullName, data.email, data.password);

      // 2. Đăng ký thành công, chuyển hướng đến trang login
      // (Bạn cũng có thể tự động login user ở đây nếu muốn)
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });

    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data.message || 'Registration failed. Email might be taken.');
      } else {
        setApiError('An error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Register</h1>
      </div>

      <div className="container-fluid bg-light overflow-hidden py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.1s">
              <form onSubmit={handleSubmit(onSubmit)}>

                {apiError && (
                  <div className="alert alert-danger" role="alert">
                    {apiError}
                  </div>
                )}

                <div className="form-item">
                  <label className="form-label my-3">Full Name<sup>*</sup></label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    {...register('fullName', { required: 'Full Name is required' })}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Email Address<sup>*</sup></label>
                  <input 
                    type="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Password<sup>*</sup></label>
                  <input 
                    type="password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                  <Link to="/login" className="mt-3">Already have an account? Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;