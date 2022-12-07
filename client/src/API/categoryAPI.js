import axiosInstance from './axiosInstance';

const categoryAPI = {
  //! @desc     Fetch all categories
  //! @route    GET /api/categories
  //! @access   Public
  getCategories: (config) => {
    const url = `/categories`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Fetch one category
  //! @route    GET /api/category/:slug
  //! @access   Private: Admin,
  getCategory: (slug, config) => {
    const url = `/category/${slug}`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Create a new Category
  //! @route    POST /api/category
  //! @access   Public
  createCategory: (category, config) => {
    const url = `/category`;
    return axiosInstance.post(url, category, config);
  },

  //! @desc     Fetch all products
  //! @route    GET /api/products
  //! @access   Public
  updateCategory: (slug, category, config) => {
    const url = `/category/${slug}`;
    return axiosInstance.post(url, category, config);
  },

  deleteCategory: (slug, config) => {
    const url = `/category/${slug}`;
    return axiosInstance.delete(url, config);
  },
};

export default categoryAPI;
