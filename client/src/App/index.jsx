import React from 'react';
import '../bootstrap.min.css';
import '../main.css';
import { Container } from 'react-bootstrap';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//! imp Screens
import HomeScreen from '../features/Home/screens/HomeScreen';
import ErrorScreen from '../features/Error/screens/ErrorScreen';
import RegisterScreen from '../features/User/screens/RegisterScreen';
import LoginScreen from '../features/User/screens/LoginScreen';
import ProfileScreen from '../features/User/screens/ProfileScreen';
//! imp Components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const RootComponent = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <main>
        <Container>
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
      { index: true, element: <HomeScreen /> },
      { path: '/register', element: <RegisterScreen /> },
      { path: '/login', element: <LoginScreen /> },
      { path: '/profile', element: <ProfileScreen /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <ToastContainer />
        <h2>Hello World</h2>
      </div>
    </RouterProvider>
  );
}

export default App;
