import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Utility from '../../../utils';

//! imp API
import productAPI from '../../../API/productAPI';
import categoryAPI from '../../../API/categoryAPI';

//! components
import { Col, Row, Card } from 'react-bootstrap';
import LocalSearchComponent from '../../../components/forms/LocalSearchComponent';
import ProductFormComponent from '../components/forms/ProductFormComponent';
import AlertDismissibleComponent from '../../../components/alerts/AlertDismissibleComponent';

//! components/icons

const ProductUpdateScreen = () => {
  const { productId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState();
  const [categories, setCategories] = React.useState([]);
  const [subOptions, setSubOptions] = React.useState([]);
  const [showSub, setShowSub] = React.useState(false);

  //! turn on/off Alert
  const [showAlert, setShowAlert] = React.useState(false);
  //! search/filter
  const [keyword, setKeyword] = React.useState('');

  const auth = useSelector((state) => ({ ...state.auth }));

  //! effect Deps
  React.useEffect(() => {
    auth.error && toast.error(auth.error);
  }, [auth.error]);

  //! effect DidMount
  React.useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  //! handle__Submit
  const onSubmit = (data, e) => {
    // console.log('__Debugger__ProductUpdateScreens__data: ', data);
    //! guard clause
    if (JSON.stringify(data) === JSON.stringify(product)) return;

    if (data.name && data.description) {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      //! handle image [objectFile or string]
      const image = typeof data.image === 'object' ? data.image[0] : data.image;

      productAPI
        .updateProduct(product._id, { ...data, image }, config)
        .then((data) => {
          // console.log('__Debugger__screens__ProductUpdateScreen__data: ', data);
          setLoading(false);
          setProduct(data);
          setShowAlert(true);
          toast.success(`Sản phẩm được cập nhật.`);
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            '__Debugger__screens__ProductUpdateScreen__error: ',
            error
          );
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  const loadProduct = () => {
    productAPI
      .getProduct(productId)
      .then((data) => {
        setProduct(data);
        loadSubCategories(data.category);
        if (data.category) setShowSub(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCategories = () => {
    categoryAPI
      .getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadSubCategories = (categoryId) => {
    categoryAPI
      .getCategorySubs(categoryId)
      .then((subs) => {
        console.log('__Debugger__getCategorySubs__subs: ', subs);
        setSubOptions(subs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryChange = (e, setValue) => {
    const categoryId = e.target.value;

    //! guard clause
    if (!categoryId) {
      setShowSub(false);
      setValue('subCategories', []);
      return;
    }

    setShowSub(true);
    if (categoryId === product.category) {
      setValue('subCategories', product.subCategories);
    } else {
      setValue('subCategories', []);
    }

    loadSubCategories(categoryId);
  };

  return (
    <div className="screen-edit-product">
      <Row>
        <Col>
          {showAlert && (
            <AlertDismissibleComponent
              show={showAlert}
              setShow={setShowAlert}
              title={`Sản phẩm được cập nhật thành công!`}
            >
              Sản phẩm <strong>{product.name}</strong> có Mã số là{' '}
              <strong>{product._id}</strong>
            </AlertDismissibleComponent>
          )}
        </Col>
        <h2 className="fw-bold mb-2 text-uppercase ">Chỉnh sửa sản phẩm</h2>
        {
          //! FORM SubCategoryFormComponent
        }
      </Row>
      <Row>
        {
          //! Show Notication Alert
        }
        <Col as="aside" md={4} className="p-3">
          <article className="gallery-wrap">
            <div className="card img-product-main-wrap">
              <Card.Img
                src={
                  product?.image ? `http://127.0.0.1:5000/${product.image}` : ``
                }
              />
            </div>
            <div className="thumbs-wrap">
              <a href="#" className="item-thumb">
                <img
                  src={
                    product?.image
                      ? `http://127.0.0.1:5000/${product.image}`
                      : ``
                  }
                />
              </a>
              <a href="#" className="item-thumb">
                <img
                  src={
                    product?.image
                      ? `http://127.0.0.1:5000/${product.image}`
                      : ``
                  }
                />
              </a>
              <a href="#" className="item-thumb">
                <img
                  src={
                    product?.image
                      ? `http://127.0.0.1:5000/${product.image}`
                      : ``
                  }
                />
              </a>
              <a href="#" className="item-thumb">
                <img
                  src={
                    product?.image
                      ? `http://127.0.0.1:5000/${product.image}`
                      : ``
                  }
                />
              </a>
            </div>
          </article>
        </Col>

        <Col md="8">
          <ProductFormComponent
            product={product}
            categories={categories}
            subOptions={subOptions}
            handleCategoryChange={handleCategoryChange}
            showSub={showSub}
            loading={loading}
            onSubmit={onSubmit}
            labelButton={'Thay đổi'}
          />
        </Col>
        {
          //! Step 2 and Step 3
        }
        <Col md="12">
          <LocalSearchComponent keyword={keyword} setKeyword={setKeyword} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdateScreen;
