import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { getProductsByCount } from '../../product/productSlice';

import { Col, Row } from 'react-bootstrap';
//! imp APIs
import productAPI from '../../../API/productAPI';

//! imp comps
import ProductCardComponent from '../../product/components/cards/ProductCardComponent';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';
import CarouselComponent from '../../../components/carousel/CarouselComponent';

const HomeScreen = () => {
  const dispatch = useDispatch();

  //! effect DidMount
  React.useEffect(() => {
    dispatch(getProductsByCount(50));
  }, [dispatch]);

  const product = useSelector((state) => ({ ...state.product }));

  const { products, loading, error } = product;
  // console.log('__Debugger__HomeScreene__products: ', products);

  React.useEffect(() => {}, []);

  // ) : error ? (
  //   <MessageCommponent variant="danger">{error}</MessageCommponent>
  return (
    <>
    <Row>
    <CarouselComponent />
    </Row>
      <h1>Latest Products</h1>
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
                <Col key={product._id} xs={6} md={4} lg={3}>
                  <ProductCardComponent product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
