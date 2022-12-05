import React from 'react';
import { Button, Card, Col, Form, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
//! imp Actions
import { toast } from 'react-toastify';
import { login } from '../authSlice';

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
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập email'),
  password: yup.string().required('Yêu cầu nhập mật khẩu'),
});

const LoginScreen = () => {
  const [showAlert, setShowAlert] = React.useState(true);

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
    console.log('__Debugger__LoginScreen__data: ', data);

    if (data.email && data.password) {
      const formData = {
        email: data.email,
        password: data.password,
      };
      dispatch(login({ formData, navigate, toast }));
    }
  };

  console.log('__Debugger__LoginScreen__email): ', { ...register('email') });
  // console.log('__Debugger__LoginScreen__error_email: ', errors.email);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Alert show={showAlert} variant="secondary">
            <Alert.Heading>Tài khoản giành cho nhà tuyển dụng!</Alert.Heading>
            <Row>
              <Col xs="6" sm="6" md="4" lg="3">
                <b> - Admin:</b>
                <div>
                  <strong>email</strong>: admin@foxv.com
                </div>
                <div>
                  <strong>password</strong>: admin123
                </div>
              </Col>
              <Col xs="6" sm="6" md="4" lg="3">
                <b> - User (client):</b>
                <div>
                  <strong>email</strong>: client@foxv.com
                </div>
                <div>
                  <strong>password</strong>: client123
                </div>
              </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShowAlert(false)} variant="danger">
                Ẩn thông báo
              </Button>
            </div>
          </Alert>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="card-main shadow overflow-hidden">
            <div className="card-line-top"></div>
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">FOXV ECOMERCE</h2>
                <p className=" mb-5">
                  Đăng nhập để tích điểm và hưởng ưu đãi thành viên khi mua
                  hàng. Nhập Email để đăng nhập thành viên FOXV.
                </p>
                <div className="mb-3">
                  {
                    //! "handleSubmit" will validate your inputs before invoking "onSubmit"
                  }
                  <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    {
                      //! Email
                    }
                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                      <Form.Label column sm="3">
                        Email
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Xin vui lòng nhập email"
                          autoComplete={'on'}
                          {...register('email', {
                            required: true,
                          })}
                          isInvalid={errors.email ? true : false}
                        />
                      </Col>
                      {errors.email && <h5>{errors.email.message}</h5>}
                    </Form.Group>

                    {
                      //! Password
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPassword"
                    >
                      <Form.Label column sm="3">
                        Mật khẩu
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          required
                          name="password"
                          type="password"
                          placeholder="Xin vui lòng nhập mật khẩu"
                          autoComplete={'on'}
                          {...register('password')}
                        />
                      </Col>
                      {errors.password && <h5>{errors.password.message}</h5>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Quên mật khẩu?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Đăng nhập
                      </Button>
                    </div>
                  </Form>

                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Bạn chưa có tài khoản?{' '}
                      <Link to={'/register'} className="text-primary fw-bold">
                        Đăng ký
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default LoginScreen;
