import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! imp components
import RatingComponent from '../../../../components/RatingComponent';

const ProductCard = ({ product }) => {
  return (
    <Card as="article" className="my-3 p-3 rounded card-product">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`http://127.0.0.1:5000/${product.image}`}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as={'div'}>{product.name}</Card.Title>
        </Link>
        <Card.Text as={'div'}>
          {/* <RatingComponent
          value={product.rating}
          text={`${product.numReviews} reviews `}
        /> */}
        </Card.Text>
        <Card.Text as={'h5'}>{product.price}</Card.Text>
      </Card.Body>
      <Card.Footer as={'div'} className="d-flex">
        <Link to={`/admin/product/${product._id}`}>
          <Button size="sm" variant={'primary'}>
              Mua ngay
          </Button>
        </Link>
        <Button
          size="sm"
          variant={'secondary'}
        >
            Thêm vào Giỏ
        </Button>
      </Card.Footer>{' '}
    </Card>
  );
};

export default ProductCard;