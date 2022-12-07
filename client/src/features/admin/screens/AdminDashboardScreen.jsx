import React from 'react';
//! Components
import AdminNavComponent from '../components/navbar/AdminNavComponent';
import CategoryCreate from '../../category/screens/CategoryCreate';
import { Row, Col } from 'react-bootstrap';

const AdminDashboardScreen = () => {
  return (
    <Row>
      <Col md="2">
        <AdminNavComponent />
      </Col>
      <Col>
        <CategoryCreate />
      </Col>
    </Row>
  );
};

export default AdminDashboardScreen;
