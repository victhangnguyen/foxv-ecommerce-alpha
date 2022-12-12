import React from 'react';
import { Controller } from 'react-hook-form';
import { Row, Col, Form } from 'react-bootstrap';

const SelectControllerComponent = ({
  control,
  register,
  options,
  name,
  label,
  handleChange,
  errors,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Group as={Row} className="mb-3" controlId={`ipt-${name}`}>
          <Form.Label>{label}</Form.Label>
          <Col>
            <Form.Select
              {...field}
              size="sm"
              isInvalid={errors[name] ? true : false}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
            >
              <option value={''}>Vui lòng chọn</option>
              {options?.map((option, index) => (
                <option key={option.key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
            {errors[name] && (
              <Form.Control.Feedback type="invalid">
                {errors[name].message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
      )}
    />
  );
};

export default SelectControllerComponent;
