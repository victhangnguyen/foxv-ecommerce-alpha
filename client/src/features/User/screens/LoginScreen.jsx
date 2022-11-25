import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  password: yup.string().required('Yêu cầu nhập email'),
});

const LoginScreen = () => {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });

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
  };

  console.log('__Debugger__LoginScreen__email): ', { ...register('email') });
  console.log('__Debugger__LoginScreen__error_email: ', errors.email);

  return (
    <React.Fragment>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="card-main shadow overflow-hidden">
            <div className="card-line-top"></div>
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">FOXV ECOMERCE</h2>
                <p className=" mb-5">Xin vui lòng nhập email và mật khẩu!</p>
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
                      {errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email.message}
                        </Form.Control.Feedback>
                      )}
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
                      <Form.Control.Feedback type="invalid">
                        Email không hợp lệ, vui lòng nhập lại!
                      </Form.Control.Feedback>
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
