import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';


//! imp Components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

//! imp Screens
import HomeScreen from '../features/home/screens/HomeScreen';
import ErrorScreen from '../features/error/screens/ErrorScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';
import AddEditProductScreen from '../features/product/screens/AddEditProductScreen';
import ProductDetailScreen from '../features/product/screens/ProductDetailScreen';
//! imp Screens Admin
import AdminDashboardScreen from '../features/admin/screens/AdminDashboardScreen';

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
      //! Private Routes: Admin
      { path: '/admin/dashboard', element: <AdminDashboardScreen /> },
    ],
  },
]);

export default router;
