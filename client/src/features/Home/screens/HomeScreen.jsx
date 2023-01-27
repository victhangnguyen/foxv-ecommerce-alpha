import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { getProductsByCount, getProducts } from '../../product/productSlice';

import { Col, Row } from 'react-bootstrap';

//! imp APIs
import productAPI from '../../../API/productAPI';

//! imp Components
import NewArrivalsComponent from '../components/NewArrivalsComponent';
import BestSellersComponent from '../components/BestSellersComponent';
import ProductCard from '../../product/components/cards/ProductCard';
import LoadingProductCard from '../../product/components/cards/LoadingProductCard';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';
import CarouselComponent from '../../../components/carousel/CarouselComponent';
import Jumbotron from '../../../components/jumbotron/Jumbotron';

const HomeScreen = () => {
  //! textArr of Jumbotron
  const textArr = ['Welcome to Foxv Ecommer', 'Trung tâm thương mại điện tử'];

  // ) : error ? (
  //   <MessageCommponent variant="danger">{error}</MessageCommponent>
  return (
    <>
      <Row>
        <CarouselComponent />
      </Row>
      <Row>
        <Jumbotron textArr={textArr} />
      </Row>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivalsComponent />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellersComponent />
    </>
  );
};

export default HomeScreen;
