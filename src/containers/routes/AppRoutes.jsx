import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../content/pages/Dashboard';
import Users from '../content/pages/users/Users';
import Products from '../content/pages/Products';
import DetailProduct from '../content/pages/DetailProduct';
import AddProduct from '../content/pages/AddProduct';
import Login from '../content/pages/login/Login';

function AppRoutes() {
  const isAuthenticated = localStorage.getItem("token")
  return (
    <Routes>
        {/* Các route trong main layout */}
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path='/users' element={<Users/>}></Route>

        {/* Route login */}
        <Route path='/login' element={<Login/>}></Route>

        {/* Route không phù hợp */}
        <Route path='*' element={<Login/>}></Route>
    </Routes>
  )
}

export default AppRoutes