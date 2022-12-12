import React from 'react';
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import * as yup from 'yup';
//! imp Actions
import categoryAPI from '../../../API/categoryAPI';
import subCategoryAPI from '../../../API/subCategoryAPI';
//! imp components/forms
import SubCategoryFormComponent from '../components/forms/SubCategoryFormComponent';

const useYupValidationResolver = (validationSchema) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Ít nhất 3 ký tự.')
    .max(5, 'Nhiều nhất 5 ký tự.')
    .required('Vui lòng nhập Họ của bạn.'),
});

const SubCategoryUpdateScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  const auth = useSelector((state) => ({ ...state.auth }));

  React.useEffect(() => {
    auth.error && toast.error(auth.error);
  }, [auth.error]);

  React.useEffect(() => {
    loadSubCategory();
    loadCategories();
  }, []);

  const loadCategories = () => {
    categoryAPI
      .getCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const loadSubCategory = () => {
    // console.log('__Debugger__screens__SubCategoryUpdate__slug: ', slug);
    subCategoryAPI
      .getSubCategory(slug)
      .then((subCategory) => {
        // console.log(
        //   '__Debugger__screens__SubCategoryUpdate__sub: ',
        //   subCategory
        // );
        setSubCategory(subCategory);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const onSubmit = (data) => {
    if (data.name && data.category) {
      const subCategory = {
        name: data.name,
        parent: data.category,
      };
      setLoading(true);
      subCategoryAPI
        .updateSubCategory(slug, subCategory)
        .then((data) => {
          setLoading(false);
          navigate(`/admin/subcategory`);
          toast.success(`Sub thay đổi thành công!`);
          // setName(data.name);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <div className="mb-3 mt-md-4">
      <Row>
        <Col>
          <Breadcrumb>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/admin/subcategory`}>Sub-Category</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/admin/subcategory/${slug}`}>{subCategory?.name}</Link>
            </li>
          </Breadcrumb>
        </Col>
      </Row>
      <h2 className="fw-bold mb-2 text-uppercase ">
        Thay đổi thông tin Sub-Category
      </h2>
      <p className=" mb-3">
        Điền đầy đủ thông tin để thay đổi Thông tin Sub-Category!
      </p>
      {
        //! rhf SubCategoryFormComponent
      }
      <SubCategoryFormComponent
        subCategory={subCategory}
        categories={categories}
        loading={loading}
        onSubmit={onSubmit}
        button={'Thay đổi'}
      />
      <hr />
    </div>
  );
};

export default SubCategoryUpdateScreen;
