import React from 'react';
import '../bootstrap.min.css';
import '../main.css';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//! imp Screens
import HomeScreen from '../features/home/screens/HomeScreen';
import ErrorScreen from '../features/error/screens/ErrorScreen';
import RegisterScreen from '../features/user/screens/RegisterScreen';
import LoginScreen from '../features/user/screens/LoginScreen';
import ProfileScreen from '../features/user/screens/ProfileScreen';
import AddEditProductScreen from '../features/product/screens/AddEditProductScreen';
//! imp Components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
//! store
import store from './store';

const RootComponent = () => {
  return (
    <React.Fragment>
      <ToastContainer />
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
      { path: '/addProduct', element: <AddEditProductScreen /> },
      { path: '/editProduct/:productId', element: <AddEditProductScreen /> },
    ],
  },
]);

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
