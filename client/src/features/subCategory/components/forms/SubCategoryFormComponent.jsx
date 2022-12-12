import React from 'react';
import * as yup from 'yup';
//! imp Components
import { Button } from 'react-bootstrap';
import FormComponent from '../../../../components/forms/FormComponent';
import InputComponent from '../../../../components/forms/InputComponent';
import SelectComponent from '../../../../components/forms/SelectComponent';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Ít nhất 3 ký tự.')
    .max(5, 'Nhiều nhất 5 ký tự.')
    .required('Vui lòng nhập Tên Sub-Category.'),
});

const SubCategoryFormComponent = ({
  subCategory,
  categories,
  loading,
  onSubmit,
  labelButton = 'Tạo ngay',
}) => {
  const options = categories.map((category) => {
    return { key: category._id, value: category._id, label: category.name };
  });

  // console.log(
  //   '__Debugger__SubCategoryFormComponent__subCategory: ',
  //   subCategory
  // );

  const initialValues = [
    { name: 'category', value: subCategory?.parent },
    { name: 'name', value: subCategory?.name },
  ];

  return (
    <React.Fragment>
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <SelectComponent
          name="category"
          placeholder={'Tên của Category'}
          options={options}
        />
        <InputComponent
          name={'name'}
          label={'Tên Sub-Cateogry'}
          placeholder={'Tên của Sub-Category'}
        />
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

export default SubCategoryFormComponent;
