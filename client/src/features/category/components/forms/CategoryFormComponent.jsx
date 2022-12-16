import React from 'react';
import * as yup from 'yup';
//! imp Components
import { Button } from 'react-bootstrap';
import FormComponent from '../../../../components/forms/FormComponent';
import InputComponent from '../../../../components/forms/InputComponent';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Ít nhất 2 ký tự.')
    .max(32, 'Nhiều nhất 32 ký tự.')
    .required('Vui lòng nhập Category.'),
});

const CategoryForm = ({ loading, onSubmit, labelButton = 'Tạo ngay' }) => {
  return (
    <React.Fragment>
      <FormComponent validationSchema={validationSchema} onSubmit={onSubmit}>
        <InputComponent name={'name'} placeholder={'Tên của Category'} />
        {
          //! Submit
        }
        <div>
          <Button variant="primary" type="submit">
            {loading ? 'Loading...' : labelButton}
          </Button>
        </div>
      </FormComponent>
    </React.Fragment>
  );
};

export default CategoryForm;
