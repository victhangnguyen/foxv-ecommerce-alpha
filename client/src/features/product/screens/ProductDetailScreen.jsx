import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

//! imp actions
import { getProduct } from '../productSlice';

//! imp components
import { Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { product } = useSelector((state) => ({ ...state.product }));

  React.useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  console.log('__Debugger__screens__ProductDetailScreen__product: ', product);
  return (
    <section className="section-content padding-y bg">
      <Card as="article">
        <Card.Body>
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Trang Chủ</Link>
              </Breadcrumb.Item>
              {
                //! Category
              }
              <Breadcrumb.Item>
                <Link>{product.category}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Link to="#">{product.name}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row>
            <Col as="aside" md={4}>
              <article className="gallery-wrap">
                <div className="card img-product-main-wrap">
                  <Card.Img
                    src={`http://127.0.0.1:5000/${product.imageFile}`}
                  />
                </div>
                <div className="thumbs-wrap">
                  <a href="#" className="item-thumb">
                    <img src={`http://127.0.0.1:5000/${product.imageFile}`} />
                  </a>
                  <a href="#" className="item-thumb">
                    <img src={`http://127.0.0.1:5000/${product.imageFile}`} />
                  </a>
                  <a href="#" className="item-thumb">
                    <img src={`http://127.0.0.1:5000/${product.imageFile}`} />
                  </a>
                  <a href="#" className="item-thumb">
                    <img src={`http://127.0.0.1:5000/${product.imageFile}`} />
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

                <div className="form-group">
                  <label className="text-muted">Available sizes</label>
                  <div>
                    <label className="js-check btn btn-check active mr-1">
                      <input
                        type="radio"
                        name="option_size"
                        value="option1"
                        checked=""
                      />
                      <span>Small</span>
                    </label>
                    <label className="js-check btn btn-check mr-1">
                      <input type="radio" name="option_size" value="option1" />
                      <span>Medium</span>
                    </label>
                    <label className="js-check btn btn-check mr-1">
                      <input type="radio" name="option_size" value="option1" />
                      <span>Large</span>
                    </label>
                    <label className="js-check btn btn-check disabled">
                      <input
                        type="radio"
                        name="option_size"
                        disabled=""
                        value="option1"
                      />
                      <span>Babies</span>
                    </label>
                  </div>
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
