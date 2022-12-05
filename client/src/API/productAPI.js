import axiosInstance from './axiosInstance';

const productAPI = {
  //! @desc     Fetch all products
  //! @route    GET /api/products
  //! @access   Public
  getProducts: (config) => {
    const url = `/products`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Fetch one product
  //! @route    GET /api/products/idProduct
  //! @access   Public
  getProduct: (productId, config) => {
    const url = `/products/${productId}`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Create a product
  //! @route    POST /api/products
  //! @access   Admin
  createProduct: (formData, config) => {
    const url = `/products`;
    return axiosInstance.post(url, formData, config);
  },
};

export default productAPI;
