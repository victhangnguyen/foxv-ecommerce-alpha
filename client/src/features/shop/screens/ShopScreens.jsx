import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

//! imp Actions
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../../../features/product/productSlice';

//! imp Components
import SearchFiltersComponent from '../components/SearchFiltersComponent';
import ProductCard from '../../../features/product/components/cards/ProductCard';
import LoadingProductCard from '../../../features/product/components/cards/LoadingProductCard';

const ShopScreens = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { text } = useSelector((state) => state.search);
  const [ok, setOk] = React.useState(false);
  // const [products, setProducts] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);

  console.log('__Debugger__ShopScreen__products: ', products);

  //! 1. load products by default on page load (dispatch actions or from APIs)
  //! effect DidMount
  React.useEffect(() => {
    dispatch(getProductsByCount(10));
  }, []);

  //! 2. load products when the user search input
  //! effect Deps: text
  React.useEffect(() => {
    if (!text) return //! myidea
    //! deplay to performance app
    const delayed = setTimeout(() => {
      dispatch(fetchProductsByFilter({ query: text }));
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  //! 3. load products based on Price Range
  //! effect Deps
  // React.useEffect(() => {
  //   //! effect
  //   console.log('ok to request')
  //   dispatch(fetchProductsByFilter({ price }));
  // }, [ok]);

  const loadAllProduct = () => {
    //! localFunction
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
        <SearchFiltersComponent />

        </Col>
        <Col md={9}>
          {loading === true ? (
            <LoadingProductCard count={12} />
          ) : (
            <>
              <Row>
                {
                  //! Container that in main (App-index.js)
                }
                {products.length > 0 &&
                  products.map((product) => {
                    return (
                      <Col key={product._id} xs={6} md={4} lg={3}>
                        {/* <LoadingProductCard /> */}
                        <ProductCard product={product} />
                      </Col>
                    );
                  })}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShopScreens;
