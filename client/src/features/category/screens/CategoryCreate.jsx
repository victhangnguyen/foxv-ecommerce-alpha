import React from 'react';
import { Col, Form, Row, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
//! imp Actions
import categoryAPI from '../../../API/categoryAPI';
// import { register as authRegister } from '../../category/';
//! components/icons
import EditRegularIcon from '../../../components/icons/EditRegularIcon';
import TrashIcon from '../../../components/icons/TrashIcon';

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

const CategoryCreate = () => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const auth = useSelector((state) => ({ ...state.auth }));

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });

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
    setLoading(true);
    const { name } = data;

    if (name) {
      const category = {
        name,
      };
      categoryAPI
        .createCategory(category)
        .then((category) => {
          console.log(
            '__Debugger__screens__CategoryCreate__category: ',
            category
          );
          setLoading(false);
          loadCategories();
          toast.success(`${category.name} đã được tạo!`);
        })
        .catch((error) => {
          setLoading(false);
          console.log('__Debugger__screens__CategoryCreate__error: ', error);
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
          '__Debugger__screens__CategoryCreate__removeCategory__error: ',
          error
        );

        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="mb-3 mt-md-4">
      <h2 className="fw-bold mb-2 text-uppercase ">Tạo Category</h2>
      <p className=" mb-3">Điền đầy đủ thông tin để tạo Category mới!</p>{' '}
      {
        //! "handleSubmit" will validate your inputs before invoking "onSubmit"
      }
      <Form noValidate onSubmit={handleSubmit(onSubmit)} validated={false}>
        <div className="form-input mb-5">
          {
            //! name
          }
          <Form.Group as={Row} className="mb-3" controlId="ipt-name">
            <Form.Label>Tên Category:</Form.Label>
            <Col md="6">
              <Form.Control
                name="name"
                type="text"
                placeholder="Nhập tên của Category"
                {...register('name', {
                  required: true,
                })}
                isInvalid={errors.name ? true : false}
                autoComplete={'off'}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>

          {
            //! Submit
          }
        </div>
        <div>
          <Button variant="primary" type="submit">
            {loading ? 'Loading...' : 'Tạo ngay'}
          </Button>
        </div>
      </Form>
      <hr />
      <Row>
        {categories.map((category) => {
          return (
            <Col md="4" key={category.slug}>
              <Card className="card-category my-1 bg-light">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <strong>{category.name}</strong>
                  <div className="control">
                    <span>
                      <Button
                        className="btn-sm float-end m-1"
                        variant="danger"
                        onClick={() => handleRemove(category.slug)}
                      >
                        <TrashIcon color="white" size="1.5rem" />
                      </Button>
                    </span>
                    <span>
                      <Button
                        className="btn-sm float-end m-1"
                        variant="warning"
                      >
                        <EditRegularIcon color="white" size="1.5rem" />
                      </Button>
                    </span>
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

export default CategoryCreate;
