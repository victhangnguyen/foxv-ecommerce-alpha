import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//! imp actions
import { createProduct } from '../productSlice';

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
  tags: yup
    .array()
    .max(10, 'Tối đa là 10 tags')
    .required('Vui lòng thêm ít nhất 1 tag'),
  category: yup
    .string()
    .min(3, 'Vui lòng chọn Phân loại sản phẩm.')
    .max(3, 'Vui lòng chọn Phân loại sản phẩm.')
    .required('Vui lòng chọn Phân loại sản phẩm.'),
  price: yup
    .number()
    .min(0, 'Giá sản phẩm không âm')
    .max(5000000, 'Sản phẩm không vượt quá 5 triệu.')
    .required('Vui lòng nhập Giá sản phẩm.'),
  countInStock: yup
    .number()
    .min(0, 'Sản phẩm tồn kho thấp nhất là 0.')
    .max(500, 'Sản phẩm tồn kho lớn nhất là 500.')
    .required('Vui lòng nhập Giá sản phẩm.'),
});

const AddEditProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { loading, error } = useSelector((state) => ({ ...state.product }));

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver });

  console.log('__Debugger__Screens__AddEditProductScreen__errors ', errors);

  const checkKeyDown = (e) => {
    console.log(
      '__Debugger__Screens__AddEditProductScreen__event ',
      e.target
    );
    if (e.code === 'Enter') {
      //! exception
      if (e.target.nodeName === 'TEXTAREA') return;
      if (e.target.name === 'imageFile') return;
      e.preventDefault();
    }
  };

  const onSubmit = async (data) => {
    //! guard clause validation by yup
    console.log('__Debugger__Screens__AddEditProductScreen__data ', data);

    const updatedProductData = {
      ...data,
      // creator: user.result._id,
      imageFile: data.imageFile[0],
    };
    // console.log(
    //   '__Debugger__Screens__AddEditProductScreen__updatedProductData: ',
    //   updatedProductData
    // );

    // toast.success('Created Product!');
    try {
      const originalPromiseResult = await dispatch(
        createProduct(updatedProductData)
      ).unwrap();

      console.log('originalPromiseResult: ', originalPromiseResult);
      handleClear();

      toast.success('Created Product!');
    } catch (rejectedValueOrSerializedError) {
      toast.error(rejectedValueOrSerializedError);
    }
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
              <div className="mb-2 mt-md-2">
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
                      //! imageFile
                    }
                    <Form.Group controlId="ipt-imageFile" className="mb-3">
                      <Form.Label>Chọn hình ảnh</Form.Label>
                      <Form.Control type="file" {...register('imageFile')} />
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
                      //! category
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="slt-category"
                    >
                      <Form.Label>Phân loại sản phẩm</Form.Label>
                      <Col>
                        <Form.Select
                          isInvalid={errors.category ? true : false}
                          {...register('category', {
                            required: true,
                          })}
                          aria-label="Phân loại sản phẩm"
                        >
                          <option value="none">Chọn Loại sản phẩm</option>
                          <option value="DRS">Đầm</option>
                          <option value="SHT">Áo</option>
                          <option value="PAT">Quần</option>
                          <option value="BET">Thắt lưng</option>
                          <option value="COT">Áo khoác</option>
                        </Form.Select>
                        {errors.category && (
                          <Form.Control.Feedback type="invalid">
                            {errors.category.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! price
                    }
                    <Form.Group as={Row} className="mb-3" controlId="ipt-price">
                      <Form.Label>Giá sản phẩm</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          defaultValue={0}
                          placeholder="Giá sản phẩm"
                          {...register('price', {
                            required: true,
                          })}
                          isInvalid={errors.price ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.price && (
                          <Form.Control.Feedback type="invalid">
                            {errors.price.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! countInStock
                    }
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="ipt-countInStock"
                    >
                      <Form.Label>Số sản phẩm trong kho</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          defaultValue={0}
                          placeholder="Số sản phẩm trong kho"
                          {...register('countInStock', {
                            required: true,
                          })}
                          isInvalid={errors.countInStock ? true : false}
                          autoComplete={'off'}
                        />
                        {errors.countInStock && (
                          <Form.Control.Feedback type="invalid">
                            {errors.countInStock.message}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                    {
                      //! tags
                    }
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Group
                          as={Row}
                          className="form-group mb-3"
                          controlId="ipt-tags"
                        >
                          <Col>
                            <Form.Label>Tags</Form.Label>
                            <TagsInputComponent
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              errors={errors}
                            />
                            {errors.tags && (
                              <div className="form-invalid-feedback">
                                {errors.tags.message}
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      )}
                    />

                    {
                      //! Submit
                    }
                  </div>

                  <div className="d-grid mb-2">
                    <Button variant="primary" type="submit">
                      Thêm sản phẩm
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddEditProductScreen;
