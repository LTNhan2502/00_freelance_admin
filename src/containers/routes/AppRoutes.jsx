import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../content/pages/Dashboard';
import Users from '../content/pages/users/Users';
import Products from '../content/pages/Products';
import DetailProduct from '../content/pages/DetailProduct';
import AddProduct from '../content/pages/AddProduct';
import Login from '../content/pages/login/Login';

function AppRoutes() {
  return (
    <Routes>
      {/* Các route trong main layout chỉ xuất hiện khi đã đăng nhập */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<DetailProduct />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/users" element={<Users />} />

      {/* Route login nằm ngoài layout */}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes