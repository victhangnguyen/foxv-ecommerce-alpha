import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { getProducts } from '../../product/productSlice';

import { Col, Row } from 'react-bootstrap';

//! imp comps
import ProductComponent from '../../product/components/ProductComponent';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';

const HomeScreen = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = useSelector((state) => ({ ...state.product }));

  const { products, loading, error } = product;
  console.log('__Debugger__HomeScreene__products: ', products);

  return (
    <>
      <h1>Latest Products</h1>
      {loading === 'idle' || loading === 'pending' ? (
        <LoaderCommponent />
      ) : error ? (
        <MessageCommponent variant="danger">{error}</MessageCommponent>
      ) : (
        <Row>
          {
            //! Container that in main (App-index.js)
          }
          {products.length > 0 &&
            products.map((product) => {
              return (
                <Col key={product._id} xs={6} md={4} lg={3}>
                  <ProductComponent product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
