import React, { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "../components/navigation";
import {
  Dashboard,
  Products,
  Users,
  Checkouts,
  UserProfile,
  UpdateProfile,
  ResetPassword,
  ProductDetail,
  CheckoutDetail,
  UserDetail,
  AddProducts,
  UpdateProduct,
  Cart,
} from "../layouts/app";
import { useSelector } from "react-redux";

const MainRoutes = () => {
  const { currentUser } = useSelector((state) => state?.authhelper);

  return (
    <Fragment>
      <Navigation>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/product/checkouts" element={<Checkouts />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/product/detail" element={<ProductDetail />} />
          <Route
            path="/admin/product/checkout/detail"
            element={<CheckoutDetail />}
          />
          <Route path="/admin/user/detail" element={<UserDetail />} />

          <Route path="/admin/products/create" element={<AddProducts />} />
          <Route path="/admin/products/update" element={<UpdateProduct />} />
          <Route path="/user/products/Cart" element={<Cart />} />

          <Route path="/user/account/profile" element={<UserProfile />} />
          <Route
            path="/user/account/profile/update"
            element={<UpdateProfile />}
          />
          <Route
            path="/user/account/reset/password"
            element={<ResetPassword />}
          />

            <Route
              path="/"
              index={true}
              element={
                <Navigate to={ currentUser?.user_type === "admin" ? "/admin/dashboard" :'/admin/products?currentPage=1&pageSize=20'} replace={true} index={true} />
              }
            />
          
            <Route
              path="*"
              index={true}
              element={
                <Navigate to={ currentUser?.user_type === "admin" ? "/admin/dashboard" :'/admin/products?currentPage=1&pageSize=20'} replace={true} index={true} />
              }
            />
        
        </Routes>
      </Navigation>
    </Fragment>
  );
};

export default MainRoutes;
