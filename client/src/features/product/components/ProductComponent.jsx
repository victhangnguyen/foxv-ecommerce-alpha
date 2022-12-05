import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! imp components
import RatingComponent from '../../../components/RatingComponent';

const Product = ({ product }) => {
  return (
    <Card as="article" className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`http://127.0.0.1:5000/${product.imageFile}`}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as={'div'}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as={'div'}>
        {/* <RatingComponent
          value={product.rating}
          text={`${product.numReviews} reviews `}
        /> */}
      </Card.Text>
      <Card.Text as={'h5'}>{product.price}</Card.Text>
    </Card>
  );
};

export default Product;
