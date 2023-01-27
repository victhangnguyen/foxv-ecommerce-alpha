import React from 'react';
import { toast } from 'react-toastify';
import { Col, Row, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! imp APIs
import productAPI from '../../../API/productAPI';
//! imp comps
import AdminProductCard from '../../product/components/cards/AdminProductCard';
import LoaderCommponent from '../../../components/LoaderCommponent';

const AllProductScreen = () => {
  const [loading, setLoading] = React.useState();
  const [products, setProducts] = React.useState([]);
  //! effect DidMount
  React.useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    productAPI
      .getProductsByCount(10)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemove = (productId) => {
    productAPI
      .removeProduct(productId)
      .then((data) => {
        console.log('__Debugger__AdminProductCard__data: ', data);
        loadAllProducts();
        toast(`Sản phẩm ${data.name} đã được xóa`)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ) : error ? (
  //   <MessageCommponent variant="danger">{error}</MessageCommponent>
  return (
    <div>
      <Row>
        {/* <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang Chủ</Link>
          </Breadcrumb.Item>
          {
            //! Category
          }
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Link to="#">Quản lý sản phẩm</Link>
          </Breadcrumb.Item>
        </Breadcrumb> */}
      </Row>

      <h1>Quản lý Sản phẩm </h1>
      {loading === true ? (
        <LoaderCommponent />
      ) : (
        <Row>
          {
            //! Container that in main (App-index.js)
          }
          {products.length > 0 &&
            products.map((product) => {
              return (
                <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
};

export default AllProductScreen;
