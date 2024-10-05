import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../content/pages/Dashboard';
import Users from '../content/pages/Users';
import Products from '../content/pages/Products';
import DetailProduct from '../content/pages/DetailProduct';
import AddProduct from '../content/pages/AddProduct';

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/products' element={<Products/>}>
          {/* <Route path=':id' element={<DetailProduct/>}></Route> */}
        </Route>
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path='/users' element={<Users/>}></Route>
    </Routes>
  )
}

export default AppRoutes