import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
//! imp Components
import LoadingProductCard from '../../product/components/cards/LoadingProductCard';
import ProductCard from '../../product/components/cards/ProductCard';

//! imp API
import categoryAPI from '../../../API/categoryAPI';

const CollectionScreen = () => {
  const [category, setCategory] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { slug } = useParams();

  //! effect DidMount
  React.useEffect(() => {
    setLoading(true);

    categoryAPI.getCategory(slug).then((res) => {
      setCategory(res.category);
      setProducts(res.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container">
      <div className="jumbotron">{category.name}</div>
      {loading === true ? (
        <LoadingProductCard count={4} />
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
    </div>
  );
};

export default CollectionScreen;
