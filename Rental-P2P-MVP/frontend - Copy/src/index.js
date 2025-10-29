import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // File CSS trống
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // <-- 1. Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- 2. Bọc App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);