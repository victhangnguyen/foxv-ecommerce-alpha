import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

//! imp Components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
//! Route
import UserRoute from '../components/routes/UserRoute';
import SubcriberRoute from '../components/routes/SubcriberRoute';
import AdminRoute from '../components/routes/AdminRoute';

//! imp Screens
import HomeScreen from '../features/home/screens/HomeScreen';
import ErrorScreen from '../features/error/screens/ErrorScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';
import AddEditProductScreen from '../features/product/screens/AddEditProductScreen';
import ProductDetailScreen from '../features/product/screens/ProductDetailScreen';
//! imp Screens User
import HistoryScreen from '../features/user/screens/HistoryScreen';
import PasswordScreen from '../features/user/screens/PasswordScreen';
import WishlistScreen from '../features/user/screens/WishlistScreen';
//! imp Screens Admin
import AdminDashboardScreen from '../features/admin/screens/AdminDashboardScreen';
import CategoryCreateScreen from '../features/category/screens/CategoryCreateScreen';
import CategoryUpdateScreen from '../features/category/screens/CategoryUpdateScreen';
import SubCategoryCreateScreen from '../features/subCategory/screens/SubCategoryCreateScreen';
import SubCategoryUpdateScreen from '../features/subCategory/screens/SubCategoryUpdateScreen';
import ProductCreateScreen from '../features/product/screens/ProductCreateScreen';

const RootComponent = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <HeaderComponent />
      <main>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <FooterComponent />
    </React.Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    errorElement: <ErrorScreen />,
    children: [
      //! Public Routes
      { index: true, element: <HomeScreen /> },
      { path: '/register', element: <RegisterScreen /> },
      { path: '/login', element: <LoginScreen /> },
      { path: '/profile', element: <ProfileScreen /> },
      { path: '/addProduct', element: <AddEditProductScreen /> },
      { path: '/editProduct/:productId', element: <AddEditProductScreen /> },
      { path: '/product/:productId', element: <ProductDetailScreen /> },
      //! Private Routes: User
      {
        path: '/user',
        element: <UserRoute />,
        children: [
          { path: 'history', element: <HistoryScreen /> },
          { path: 'password', element: <PasswordScreen /> },
          { path: 'wishlist', element: <WishlistScreen /> },
        ],
      },
      //! Private Routes: Admin
      {
        path: '/',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin',
            element: <AdminDashboardScreen />,
            children: [
              //! Routes: admin/category
              { path: 'category', element: <CategoryCreateScreen /> },
              { path: 'category/:slug', element: <CategoryUpdateScreen /> },
              //! Routes: admin/category
              { path: 'subcategory', element: <SubCategoryCreateScreen /> },
              { path: 'subcategory/:slug', element: <SubCategoryUpdateScreen /> },
              //! Routes: admin/product
              { path: 'product', element: <ProductCreateScreen /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
