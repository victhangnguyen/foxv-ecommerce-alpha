import { NavLink, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Image from 'react-bootstrap/Image';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useDispatch, useSelector } from 'react-redux';

//! imp Actions
import { setLogout } from '../features/auth/authSlice';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const handleLogout = () => {
    dispatch(setLogout());
    toast.error(`${user?.result?.name} is logged-out`);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand>
            <NavLink to={'/'}>
              <Image src="/assets/images/icon-foxv.png" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <b>Foxv Ecommerce</b>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {
                //! Nav me-auto (margin-end)
              }
              <Nav className="me-auto">
                <Nav.Link href="#features">Sự kiện khuyến mãi</Nav.Link>
                <Nav.Link href="#features">Sản phẩm mới</Nav.Link>
                <NavDropdown title="SALE OFF" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Bộ sưu tập" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {
                //! Nav
              }
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {user?.result?._id && user?.result?.role === 'admin' ? (
                  <>
                    <NavLink className="nav-link" to={'/addProduct'}>
                      Thêm sản phẩm
                    </NavLink>
                    <NavDropdown
                      title={user.result.name}
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <NavDropdown.Item href="#action3">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : user?.result?._id && user?.result?.role === 'user' ? (
                  <>
                    <Nav.Link href="#action2">Giỏ hàng</Nav.Link>
                    <NavDropdown
                      title={user.result.name}
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <NavDropdown.Item href="#action3">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
