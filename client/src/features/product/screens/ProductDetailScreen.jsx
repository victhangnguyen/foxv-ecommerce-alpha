import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

//! APIs
import productAPI from '../../../API/productAPI';

//! imp actions
import { getProduct } from '../productSlice';

//! imp components
import { Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';

const ProductDetail = () => {
  // const [loading, setLoading] = React.useState(false);
  // const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { product } = useSelector((state) => ({ ...state.product }));

  React.useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  const loadAllProducts = () => {
    productAPI.getProductsByCount();
  };

  // console.log('__Debugger__screens__ProductDetailScreen__product: ', product);
  return (
    <section className="section-content padding-y bg">
      <Card as="article">
        <Card.Body>
          <Row>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/">{product.category}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </li>
              </ol>
            </nav>
          </Row>
          <Row>
            <Col as="aside" md={4}>
              <article className="gallery-wrap">
                <div className="card img-product-main-wrap">
                  <Card.Img
                    src={
                      product.image
                        ? `http://127.0.0.1:5000/${product.image}`
                        : ``
                    }
                  />
                </div>
                <div className="thumbs-wrap">
                  <a href="#" className="item-thumb">
                    <img
                      src={
                        product.image
                          ? `http://127.0.0.1:5000/${product.image}`
                          : ``
                      }
                    />
                  </a>
                  <a href="#" className="item-thumb">
                    <img
                      src={
                        product.image
                          ? `http://127.0.0.1:5000/${product.image}`
                          : ``
                      }
                    />
                  </a>
                  <a href="#" className="item-thumb">
                    <img
                      src={
                        product.image
                          ? `http://127.0.0.1:5000/${product.image}`
                          : ``
                      }
                    />
                  </a>
                  <a href="#" className="item-thumb">
                    <img
                      src={
                        product.image
                          ? `http://127.0.0.1:5000/${product.image}`
                          : ``
                      }
                    />
                  </a>
                </div>
              </article>
            </Col>
            <Col md={8} as="main">
              <article>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="card-id">MSP: {product._id}</Card.Text>
                <hr />

                <div className="mb-3">
                  <h6 className="fw-bold">MÔ TẢ SẢN PHẨM</h6>
                  <Card.Text>{product.description}</Card.Text>
                </div>

                <div className="mb-3">
                  <Card.Text className="card-price">{product.price}</Card.Text>{' '}
                </div>

                <div className="mb-4">
                  <Button variant="dark">MUA NGAY</Button>
                  <a href="#" className="btn btn-light">
                    Add to cart
                  </a>
                </div>
                <hr />
                <h6 className="fw-bold">HƯỚNG DẪN BẢO QUẢN</h6>
                <p>
                  Giặt tay bằng nước lạnh - Không ngâm, không tẩy - Giặt riêng
                  các sản phẩm khác màu - Không vắt. - Là ủi ở nhiệt độ thấp.
                  Khuyến khích giặt khô.
                </p>
              </article>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <article className="card mt-5">
        <div className="card-body">
          <Row>
            <Col as="aside">
              <h5>Quyền lợi là thành viên của Foxv</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                quae nobis fugiat debitis autem magnam dolor excepturi dolores
                harum corporis! Aperiam odio voluptatum adipisci debitis vero
                dolorem natus magnam inventore!
              </p>
            </Col>
          </Row>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </article>
    </section>
  );
};

export default ProductDetail;
