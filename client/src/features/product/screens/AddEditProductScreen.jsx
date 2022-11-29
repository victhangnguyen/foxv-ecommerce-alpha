import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//! imp components
import TagsInputComponent from '../../../components/TagsInputComponent';

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
  name: yup
    .string()
    .min(5, 'Ít nhất 5 ký tự.')
    .max(50, 'Nhiều nhất 50 ký tự.')
    .required('Vui lòng nhập Tên sản phẩm.'),
  description: yup
    .string()
    .min(5, 'Ít nhất 5 ký tự.')
    .max(255, 'Nhiều nhất 255 ký tự.')
    .required('Vui lòng nhập Mô tả sản phẩm.'),
});

const AddEditProductScreen = () => {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver });

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onSubmit = (data) => {
    // localFunction
    console.log('__Debugger__Screens__AddEditProductScreen__data: ', data);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <React.Fragment>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="card-main shadow overflow-hidden">
            <div className="card-line-top"></div>
            <Card.Body className="px-3 px-md-5">
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">Thêm sản phẩm</h2>
                {
                  //! "handleSubmit" will validate your inputs before invoking "onSubmit"
                }
                <Form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={(e) => checkKeyDown(e)}
                  validated={false}
                >
                  <div className="form-input mb-5">
                    {
                      //! name
                    }
                    <Form.Group as={Row} className="mb-3" controlId="ipt-name">
                      <Form.Label>Tên sản phẩm</Form.Label>
                      <Col>
                        <Form.Control
                          name="name"
                          type="text"
                          placeholder="Tên sản phẩm"
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
                      //! description
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="ipt-description"
                    >
                      <Form.Label>Mô tả sản phẩm</Form.Label>
                      <Col>
                        <Form.Control
                          name="description"
                          as="textarea"
                          rows={3}
                          placeholder="Mô tả sản phẩm"
                          {...register('description', {
                            required: true,
                          })}
                          isInvalid={errors.description ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.description && (
                          <Form.Control.Feedback type="invalid">
                            {errors.description.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! tags
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="ipt-description"
                    >
                      <Col>
                        <Form.Label>Tags</Form.Label>
                        <Controller
                          control={control}
                          name="tags"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <TagsInputComponent
                              tags={[]}
                              setValue={setValue}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          )}
                        />
                      </Col>
                    </Form.Group>
                    {
                      //! imageFile
                    }
                    <Form.Group controlId="ipt-imageFile" className="mb-3">
                      <Form.Label>Chọn hình ảnh</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    {
                      //! Submit
                    }
                  </div>

                  <div className="d-grid mb-2">
                    <Button variant="primary" type="submit">
                      Đồng ý
                    </Button>
                  </div>
                  <div className="d-grid mb-2">
                    <Button
                      variant="danger"
                      type="button"
                      onClick={handleClear}
                    >
                      Reset Form
                    </Button>
                  </div>
                </Form>

                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Bạn đã có tài khoản?{' '}
                    <Link to={'/register'} className="text-primary fw-bold">
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

export default AddEditProductScreen;
