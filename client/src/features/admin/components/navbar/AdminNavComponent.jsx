import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const AdminNavComponent = () => {
  return (
    <Nav className="flex-column">
      <div className="nav-dashboard">
        <Nav.Item>
          <Link to={`/admin/dashboard`} className="nav-link">
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/admin/products`} className="nav-link">
            Products
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/admin/product`} className="nav-link">
            Product
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/admin/category`} className="nav-link">
            Category
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/admin/sub`} className="nav-link">
            Sub Category
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/admin/coupon`} className="nav-link">
            Coupon
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={`/user/password`} className="nav-link">
            Password
          </Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default AdminNavComponent;
