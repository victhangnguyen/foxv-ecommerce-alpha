import axios from 'axios';
import axiosInstance from './axiosInstance';

const productAPI = {
  //! @desc     Fetch all products
  //! @route    GET /api/products
  //! @access   Public
  // getProducts: (config) => {
  //   const url = `/product`;
  //   return axiosInstance.get(url, config);
  // },

  getProductsByCount: (count, config) => {
    const url = `/products/${count}`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Fetch one product
  //! @route    GET /api/products/idProduct
  //! @access   Public
  getProduct: (productId, config) => {
    const url = `/product/${productId}`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Create a product
  //! @route    POST /api/products
  //! @access   Admin
  createProduct: (product, config) => {
    const url = `/product`;
    return axiosInstance.post(url, product, config);
  },

  //! @desc     Delete one Product
  //! @route    DEL /api/product/:productId
  //! @access   Private/Public
  removeProduct: (productId, config) => {
    const url = `/product/${productId}`;
    return axiosInstance.delete(url, config);
  },

  //! @desc     Update one Product
  //! @route    PUT /api/product/:productId
  //! @access   Private
  updateProduct: (productId, product, config) => {
    const url = `/product/${productId}`;
    return axiosInstance.put(url, product, config);
  },

  getProducts: (sort, order, page) => {
    const url = `/products`;
    return axiosInstance.post(url, { sort, order, page });
  },

  getProductsCount: async () => {
    const url = `/products/total`;
    return axiosInstance.get(url);
  },
};

export default productAPI;
