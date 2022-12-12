import React from 'react';
//! Components
import AdminNavComponent from '../components/navbar/AdminNavComponent';
import CategoryCreate from '../../category/screens/CategoryCreateScreen';
import { Row, Col } from 'react-bootstrap';
import { useOutlet } from 'react-router-dom';

const AdminDashboardScreen = () => {
  const outlet = useOutlet();

  return (
    <Row>
      <Col md="2">
        <AdminNavComponent />
      </Col>
      <Col>{outlet}</Col>
    </Row>
  );
};

export default AdminDashboardScreen;
