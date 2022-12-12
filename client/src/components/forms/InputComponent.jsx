import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const InputComponent = ({
  register,
  type = 'text',
  name,
  label,
  placeholder,
  errors,
  ...rest
}) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={`ipt-${name}`} >
      {label && <Form.Label>{label}</Form.Label>}
      <Col>
        <Form.Control
          {...register(name)}
          type={type}
          placeholder={placeholder}
          isInvalid={errors[name] ? true : false}
          {...rest}
          size="sm"
        />
        {errors[name] && (
          <Form.Control.Feedback type="invalid">
            {errors[name].message}
          </Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
};

export default InputComponent;
