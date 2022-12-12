import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const SelectComponent = ({
  register,
  options,
  name,
  label,
  errors,
  ...rest
}) => {
  // console.log('__Debugger__SelectComponent__options: ', options);
  return (
    <Form.Group as={Row} className="mb-3" controlId={`ipt-${name}`}>
      <Form.Label>{label}</Form.Label>

      <Col>
        <Form.Select
          {...register(name)}
          {...rest}
          size="sm"
          isInvalid={errors[name] ? true : false}
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
  );
};

export default SelectComponent;
