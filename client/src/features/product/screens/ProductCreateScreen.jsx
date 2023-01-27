import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

//! imp API
import productAPI from '../../../API/productAPI';
import categoryAPI from '../../../API/categoryAPI';

//! components
import { Col, Row } from 'react-bootstrap';
import LocalSearchComponent from '../../../components/forms/LocalSearchComponent';
import ProductFormComponent from '../components/forms/ProductFormComponent';
import AlertDismissibleComponent from '../../../components/alerts/AlertDismissibleComponent';

//! components/icons

const ProductCreateScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({});
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
    //! effect
    loadCategories();
  }, []);

  //! handle__Submit
  const onSubmit = (data, e) => {
    // console.log(
    //   '__Debugger__subCategory__screens__SubCategoryCreate__data: ',
    //   data
    // );
    if (data.name && data.description) {
      setLoading(true);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      productAPI
        .createProduct({ ...data, image: data.image[0] }, config)
        .then((product) => {
          setLoading(false);
          setNewProduct(product);
          setShowAlert(true);
          toast.success(`Sản phẩm đã được tạo`);
          //! reset form
          e.target.reset();
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            '__Debugger__screens__ProductCreateScreen__error: ',
            error
          );
          toast.error(error.response.data.message);
          if (error.response.status === 400) {
          }
        });
    }
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

  const handleCategoryChange = (e) => {
    const cateogoryId = e.target.value;
    //! guard clause
    if (cateogoryId) {
      categoryAPI
        .getCategorySubs(cateogoryId)
        .then((subs) => {
          // console.log('__Debugger__getCategorySubs__subs: ', subs);
          setSubOptions(subs);
        })
        .catch((error) => {
          console.log(error);
        });
      setShowSub(true);
    } else {
      setShowSub(false);
    }
  };

  return (
    <Row className="mb-3 mt-md-4">
      {
        //! Show Notication Alert
      }
      <Col md="12">
        {showAlert && (
          <AlertDismissibleComponent
            show={showAlert}
            setShow={setShowAlert}
            title={`Sản phẩm được tạo thành công!`}
          >
            <p>
              Sản phẩm <strong>{newProduct.name}</strong> có Mã số là{' '}
              <strong>{newProduct._id}</strong>
            </p>
            <p>
              Xem chi tiết sản phẩm mới: <Link to={`/admin/product/${newProduct._id}`}><strong>{newProduct.name}</strong></Link>
            </p>
          </AlertDismissibleComponent>
        )}
      </Col>
      <h2 className="fw-bold mb-2 text-uppercase ">Tạo sản phẩm mới</h2>
      {
        //! FORM SubCategoryFormComponent
      }
      <Col md="6">
        <ProductFormComponent
          categories={categories}
          subOptions={subOptions}
          handleCategoryChange={handleCategoryChange}
          showSub={showSub}
          loading={loading}
          onSubmit={onSubmit}
        />
      </Col>

      {
        //! Step 2 and Step 3
      }
      <Col md="12">
        <LocalSearchComponent keyword={keyword} setKeyword={setKeyword} />
      </Col>
    </Row>
  );
};

export default ProductCreateScreen;
