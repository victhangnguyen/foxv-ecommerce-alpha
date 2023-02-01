import React from 'react';
import slugify from 'slugify';
import { Col, Form, Row, Breadcrumb, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
//! imp Actions
import categoryAPI from '../../../API/categoryAPI';
// import { register as authRegister } from '../../category/';

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

const CategoryUpdateScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const { slug } = useParams();

  const auth = useSelector((state) => ({ ...state.auth }));

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ resolver });

  React.useEffect(() => {
    auth.error && toast.error(auth.error);
  }, [auth.error]);

  React.useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    categoryAPI
      .getCategory(slug)
      .then((data) => {
        setValue('name', data.category.name);
        setName(getValues('name'));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (category) => {
    setLoading(true);
    categoryAPI
      .updateCategory(slug, category)
      .then((data) => {
        setLoading(false);
        navigate(`/admin/category/${data.slug}`);
        toast.success(`${name} đổi thành ${data.slug} thành công!`);
        setName(data.name);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
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
              <Link to={`/admin/category`}>Category</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to={`/admin/category/${slug}`}>{name}</Link>
            </li>
          </Breadcrumb>
        </Col>
      </Row>
      <h2 className="fw-bold mb-2 text-uppercase ">Tạo Category</h2>
      <p className=" mb-3">
        Điền đầy đủ thông tin để thay đổi Thông tin Category!
      </p>{' '}
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
            //! slug
          }
          <p>Slug: {name && slugify(name)}</p>

          {
            //! Submit
          }
        </div>
        <div>
          <Button className="mx-2" variant="primary" type="submit">
            {loading ? 'Loading...' : 'Thay đổi'}
          </Button>
          <Button className="mx-2" variant="success" type="submit">
            <Link to="/admin/category">Quay về</Link>
          </Button>
        </div>
      </Form>
      <hr />
    </div>
  );
};

export default CategoryUpdateScreen;
