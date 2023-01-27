import React from 'react';
import { Row, Col } from 'react-bootstrap';

//! imp Components
import LoadingProductCard from '../../product/components/cards/LoadingProductCard';
import ProductCard from '../../product/components/cards/ProductCard';
import PaginationComponent from '../../../components/pagination/PaginationComponent';

//! imp API
import productAPI from '../../../API/productAPI';

const BestSellersComponent = () => {
  const [productsPerPage, setProductsPerPage] = React.useState(4);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsCount, setProductsCount] = React.useState(0);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadAllProducts();
  }, [currentPage]);

  //! effect DidMount
  React.useEffect(() => {
    productAPI.getProductsCount().then((res) => setProductsCount(res));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //! getProducts with sort, order, and limit
    productAPI.getProducts('sold', 'desc', currentPage).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  };

  return (
    <>
      {loading === true ? (
        <LoadingProductCard count={productsPerPage} />
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
          {
            //! Pagination
          }
          <div className="d-flex justify-content-center">
            <PaginationComponent
              itemsCount={productsCount}
              itemsPerPage={productsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BestSellersComponent;
