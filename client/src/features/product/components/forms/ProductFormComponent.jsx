import React from 'react';
import * as yup from 'yup';
//! imp Components
import { Button } from 'react-bootstrap';
import FormComponent from '../../../../components/forms/FormComponent';
import InputComponent from '../../../../components/forms/InputComponent';
import SelectComponent from '../../../../components/forms/SelectComponent';
import TagFieldArrayComponent from '../../../../components/forms/TagFieldArrayComponent';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(4, 'Ít nhất 4 ký tự.')
    .max(32, 'Nhiều nhất 32 ký tự.')
    .required('Yêu cầu nhập Tên sản phẩm.'),
  description: yup
    .string()
    .min(10, 'Ít nhất 10 ký tự.')
    .max(1000, 'Nhiều nhất 1000 ký tự.')
    .required('Yêu cầu nhập Mô tả sản phẩm.'),
  category: yup
    .string()
    .min(24, 'Category không hợp lệ')
    .max(24, 'Category không hợp lệ'),
  price: yup
    .number()
    .max(5000000, 'Nhiều nhất là 5 triệu')
    .min(0, 'Không được nhỏ hơn 0')
    .required('Yêu cầu nhập Giá sản phẩm'),
});

const ProductFormComponent = ({
  categories,
  subOptions,
  handleCategoryChange,
  showSub,
  loading,
  onSubmit,
  labelButton = 'Tạo ngay',
}) => {
  const initialValues = [
    { name: 'name', value: 'Áo Baby-doll Hàn Quốc' },
    { name: 'description', value: 'Mô tả phải có ít nhất 10 ký tự' },
    { name: 'price', value: 0 }, //! type: number
    { name: 'shipping', value: 'yes' },
    { name: 'quantity', value: 10 },
    { name: 'color', value: 'black' },
    { name: 'brand', value: 'dior' },
  ];

  const categoryOptions = categories?.map((category) => ({
    key: category._id,
    value: category._id,
    label: category.name,
  }));

  const subCategoryOptions = subOptions?.map((sub) => ({
    key: sub._id,
    value: sub._id,
    label: sub.name,
  }));

  const shippingOptions = [
    { key: 0, value: 'no', label: 'No' },
    { key: 1, value: 'yes', label: 'Yes' },
  ];

  const colorOptions = [{ key: 0, value: 'black', label: 'Black' }];

  const brandOptions = [{ key: 0, value: 'dior', label: 'Dior' }];

  return (
    <div className="mb-4 p-3">
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          //! name
        }
        <InputComponent
          name="name"
          label={'Tên sản phẩm'}
          placeholder={'Nhập tên sản phẩm'}
        />
        {
          //! description
        }
        <InputComponent
          name="description"
          label={'Mô tả sản phẩm'}
          placeholder={'Nhập mô tả sản phẩm'}
        />
        {
          //! category
        }
        <TagFieldArrayComponent
          handleChange={handleCategoryChange}
          name={'category'}
          label={'Sản phẩm thuộc loại'}
          options={categoryOptions}
        />
        {
          //! subCategories
        }
        {showSub ? (
          <SelectComponent
            name={'subCategories'}
            label={'Sub-Category'}
            options={subCategoryOptions}
          />
        ) : (
          <></>
        )}
        {
          //! price
        }
        <InputComponent
          type="number"
          name={'price'}
          label={'Giá sản phẩm'}
          placeholder={'Nhập giá sản phẩm'}
        />
        {
          //! shipping
        }
        <SelectComponent
          name={'shipping'}
          label={'[Status]: Miễn phí Vận chuyển'}
          options={shippingOptions}
        />
        {
          //! quantity
        }
        <InputComponent
          type="number"
          name={'quantity'}
          label={'Số lượng sản phẩm'}
          placeholder={'Nhập số lượng sản phẩm'}
        />
        {
          //! color
        }
        <SelectComponent
          name={'color'}
          label={'Màu sắc'}
          options={colorOptions}
        />
        {
          //! brand
        }
        <SelectComponent
          name={'brand'}
          label={'Thương hiệu'}
          options={brandOptions}
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
    </div>
  );
};

export default ProductFormComponent;
