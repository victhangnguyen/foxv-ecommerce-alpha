import React from 'react';
import AdminNavComponent from '../components/navbar/AdminNavComponent';
//! Components
import { Row, Col } from 'react-bootstrap';

const AdminDashboardScreen = () => {
  return (
    <Row>
      <Col md="2">
        <AdminNavComponent />
      </Col>
    </Row>
  );
};

export default AdminDashboardScreen;
