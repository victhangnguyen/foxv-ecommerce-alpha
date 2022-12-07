import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
//! imp Actions
import { toast } from 'react-toastify';
import { register as authRegister } from '../../auth/authSlice';

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
  lastName: yup
    .string()
    .min(2, 'Ít nhất 2 ký tự.')
    .max(50, 'Nhiều nhất 50 ký tự.')
    .required('Vui lòng nhập Họ của bạn.'),
  firstName: yup
    .string()
    .min(1, 'Ít nhất 1 ký tự.')
    .max(25, 'Nhiều nhất 25 ký tự.')
    .required('Vui lòng nhập Tên của bạn.'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập email'),
  password: yup.string().required('Yêu cầu nhập Mật khẩu'),
  confirmPassword: yup.string().required('Yêu cầu nhập Xác nhận mật khẩu'),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // const handleSubmit = (event) => {
  //   // event.preventDefault();
  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  // const onInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValue({ ...formValue, [name]: value });
  // };

  const onSubmit = (data) => {
    console.log('__Debugger__RegisterScreen__data: ', data);
    const { lastName, firstName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      return toast.error('Password should match!');
    }

    if (lastName && firstName && email && password && confirmPassword) {
      const formData = {
        lastName,
        firstName,
        email,
        password,
      };
      console.log('Run dispatch');

      dispatch(authRegister({ formData, navigate, toast }));
    }
  };

  // console.log('__Debugger__RegisterScreen__email): ', { ...register('email') });

  return (
    <React.Fragment>
      <Row className="mb-4 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="card-main shadow overflow-hidden">
            <div className="card-line-top"></div>
            <Card.Body className="px-3 px-md-5">
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">
                  Đăng ký tài khoản
                </h2>
                <p className=" mb-5">
                  Đăng ký để tích điểm và hưởng ưu đãi thành viên khi mua hàng.
                  Nhập Email để đăng ký thành viên FOXV.
                </p>{' '}
                {
                  //! "handleSubmit" will validate your inputs before invoking "onSubmit"
                }
                <Form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  validated={false}
                >
                  <div className="form-input mb-5">
                    {
                      //! lastName
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="ipt-lastName"
                    >
                      <Form.Label>Họ</Form.Label>
                      <Col>
                        <Form.Control
                          name="lastName"
                          type="text"
                          placeholder="Nhập họ của bạn"
                          {...register('lastName', {
                            required: true,
                          })}
                          isInvalid={errors.lastName ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.lastName && (
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>

                    {
                      //! firstName
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="ipt-firstName"
                    >
                      <Form.Label>Tên</Form.Label>
                      <Col>
                        <Form.Control
                          name="firstName"
                          type="text"
                          placeholder="Nhập tên của bạn"
                          {...register('firstName', {
                            required: true,
                          })}
                          isInvalid={errors.firstName ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.firstName && (
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! email
                    }
                    <Form.Group as={Row} className="mb-3" controlId="ipt-email">
                      <Form.Label>Email</Form.Label>
                      <Col>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Nhập email của bạn"
                          {...register('email', {
                            required: true,
                          })}
                          isInvalid={errors.email ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {errors.email.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>

                    {
                      //! password
                    }
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="ipt-password"
                    >
                      <Form.Label>Mật khẩu</Form.Label>
                      <Col>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Nhập mật khẩu"
                          {...register('password', {
                            required: true,
                          })}
                          isInvalid={errors.password ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.password && (
                          <Form.Control.Feedback type="invalid">
                            {errors.password.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! confirmPassword
                    }
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="ipt-confirmPassword"
                    >
                      <Form.Label>Xác nhận mật khẩu</Form.Label>
                      <Col>
                        <Form.Control
                          name="confirmPassword"
                          type="password"
                          placeholder="Nhập lại mật khẩu xác nhận"
                          {...register('confirmPassword', {
                            required: true,
                          })}
                          isInvalid={errors.confirmPassword ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.confirmPassword && (
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>

                    {
                      //! Submit
                    }
                  </div>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Đăng ký
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Bạn đã có tài khoản?{' '}
                    <Link to={'/login'} className="text-primary fw-bold">
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RegisterScreen;
