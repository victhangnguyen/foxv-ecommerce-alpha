import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//! imp Actions
import categoryAPI from '../../../API/categoryAPI';

//! components
import { Button, Card, Col, Row } from 'react-bootstrap';
import CategoryFormComponent from '../components/forms/CategoryFormComponent';
import LocalSearchComponent from '../../../components/forms/LocalSearchComponent';

//! components/icons
import EditRegularIcon from '../../../components/icons/EditRegularIcon';
import TrashIcon from '../../../components/icons/TrashIcon';

const CategoryCreateScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  //! search/filter
  const [keyword, setKeyword] = React.useState('');

  const auth = useSelector((state) => ({ ...state.auth }));

  React.useEffect(() => {
    auth.error && toast.error(auth.error);
  }, [auth.error]);

  React.useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    categoryAPI
      .getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    if (data.name) {
      setLoading(true);
      const category = {
        name: data.name,
      };
      categoryAPI
        .createCategory(category)
        .then((category) => {
          console.log(
            '__Debugger__screens__CategoryCreateScreen__category: ',
            category
          );
          setLoading(false);
          loadCategories();
          toast.success(`${category.name} đã được tạo!`);
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            '__Debugger__screens__CategoryCreateScreen__error: ',
            error
          );
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          }
        });

      // dispatch(authRegister({ categoryData, navigate, toast }));
    }
  };

  const handleRemove = (slug) => {
    //! Model delete
    setLoading(true);

    categoryAPI
      .deleteCategory(slug)
      .then((category) => {
        setLoading(false);
        loadCategories();
        toast.success(`${category.name} đã được xóa!`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          '__Debugger__screens__CategoryCreateScreen__removeCategory__error: ',
          error
        );

        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  //! Step 4
  const searched = (keword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <div className="mb-3 mt-md-4">
      <h2 className="fw-bold mb-2 text-uppercase ">Tạo Category</h2>
      <p className=" mb-3">Điền đầy đủ thông tin để tạo Category mới!</p>{' '}
      {
        //! rhf CategoryFormComponent
      }
      <CategoryFormComponent loading={loading} onSubmit={onSubmit} />
      <hr />
      {
        //! Step 2 and Step 3
      }
      <LocalSearchComponent keyword={keyword} setKeyword={setKeyword} />
      <Row>
        {
          //! Step 5
        }
        {categories.filter(searched(keyword)).map((category) => {
          return (
            <Col md="4" key={category._id}>
              <Card className="card-category my-1 bg-light">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <strong>{category.name}</strong>
                  <div className="control">
                    <Button
                      className="btn-sm float-end m-1"
                      variant="danger"
                      onClick={() => handleRemove(category.slug)}
                    >
                      <TrashIcon color="white" size="1.5rem" />
                    </Button>
                    <Link to={`/admin/category/${category.slug}`}>
                      <Button
                        className="btn-sm float-end m-1"
                        variant="warning"
                      >
                        <EditRegularIcon color="white" size="1.5rem" />
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CategoryCreateScreen;
