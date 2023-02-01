import React from 'react';
//! imp RTK-Actions

import { Row } from 'react-bootstrap';

//! imp helpers
import { useScroll } from '../../../helpers/scroll';

//! imp Components
import GoToButtonComponent from '../../../components/button/GoToButtonComponent';
import CarouselComponent from '../../../components/carousel/CarouselComponent';
import Jumbotron from '../../../components/jumbotron/Jumbotron';
import BestSellersComponent from '../components/BestSellersComponent';
import NewArrivalsComponent from '../components/NewArrivalsComponent';

const HomeScreen = () => {
  //! textArr of Jumbotron
  const textArr = ['Welcome to Foxv Ecommer', 'Trung tâm thương mại điện tử'];

  const scrollPosition = useScroll();

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
      <NewArrivalsComponent />
      <BestSellersComponent />

      <GoToButtonComponent visible={scrollPosition > 400} />
    </>
  );
};

export default HomeScreen;
