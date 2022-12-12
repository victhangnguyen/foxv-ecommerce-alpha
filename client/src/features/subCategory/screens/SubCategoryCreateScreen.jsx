import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//! imp Actions
import categoryAPI from '../../../API/categoryAPI';
import subCategoryAPI from '../../../API/subCategoryAPI';

//! components
import { Button, Card, Col, Row } from 'react-bootstrap';
import LocalSearchComponent from '../../../components/forms/LocalSearchComponent';
import SubCategoryFormComponent from '../components/forms/SubCategoryFormComponent';

//! components/icons
import EditRegularIcon from '../../../components/icons/EditRegularIcon';
import TrashIcon from '../../../components/icons/TrashIcon';

const SubCategoryCreateScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  //! search/filter
  const [keyword, setKeyword] = React.useState('');

  const auth = useSelector((state) => ({ ...state.auth }));

  React.useEffect(() => {
    auth.error && toast.error(auth.error);
  }, [auth.error]);

  React.useEffect(() => {
    loadCategories();
    loadSubCategories();
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

  const loadSubCategories = () => {
    subCategoryAPI
      .getSubCategories()
      .then((data) => {
        setSubCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    console.log(
      '__Debugger__subCategory__screens__SubCategoryCreate__data: ',
      data
    );
    if (data.name && data.category) {
      const subCategory = {
        name: data.name,
        parent: data.category,
      };
      // console.log(
      //   '__Debugger__subCategory__screens__SubCategoryCreate__subCategory: ',
      //   subCategory
      // );

      setLoading(true);
      subCategoryAPI
        .createSubCategory(subCategory)
        .then((subCategory) => {
          // console.log(
          //   '__Debugger__screens__SubCategoryCreateScreen__subCategory: ',
          //   subCategory
          // );
          setLoading(false);
          loadSubCategories();
          toast.success(
            `[${subCategory.name}] thuộc Nhóm [${subCategory.parent.name}] đã được tạo!`
          );
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            '__Debugger__screens__SubCategoryCreateScreen__error: ',
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

    subCategoryAPI
      .deleteSubCategory(slug)
      .then((subCategory) => {
        setLoading(false);
        loadSubCategories();
        toast.success(`Sub: ${subCategory.name} đã được xóa!`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          '__Debugger__screens__SubCategoryCreateScreen__removeCategory__error: ',
          error
        );

        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  //! Step 4
  const searched = (keword) => (subCategory) =>
    subCategory.name.toLowerCase().includes(keyword);

  return (
    <div className="mb-3 mt-md-4">
      <h2 className="fw-bold mb-2 text-uppercase ">Tạo Sub Category</h2>

      {
        //! rhf SubCategoryFormComponent
      }
      <SubCategoryFormComponent
        categories={categories}
        loading={loading}
        onSubmit={onSubmit}
      />
      <hr />
      {
        //! Step 2 and Step 3
      }
      <LocalSearchComponent keyword={keyword} setKeyword={setKeyword} />
      
      <Row>
        {
          //! Step 5
        }
        {subCategories.filter(searched(keyword)).map((sub) => {
          return (
            <Col md="4" key={sub._id}>
              <Card className="card-category my-1 bg-light">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <strong>{sub.name}</strong>
                  <div className="control">
                    <Button
                      className="btn-sm float-end m-1"
                      variant="danger"
                      onClick={() => handleRemove(sub.slug)}
                    >
                      <TrashIcon color="white" size="1.5rem" />
                    </Button>
                    <Link to={`/admin/subcategory/${sub.slug}`}>
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

export default SubCategoryCreateScreen;
