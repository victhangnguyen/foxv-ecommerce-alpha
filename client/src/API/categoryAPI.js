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
  //! @access   Public: Guest, User...
  createCategory: (category, config) => {
    const url = `/category`;
    return axiosInstance.post(url, category, config);
  },

  //! @desc     Update one Category
  //! @route    PUT /api/category/:slug
  //! @access   Private: Admin
  updateCategory: (slug, category, config) => {
    const url = `/category/${slug}`;
    return axiosInstance.put(url, category, config);
  },

  //! @desc     Delete one Category
  //! @route    DEL /api/category/:slug
  //! @access   Private: Admin
  deleteCategory: (slug, config) => {
    const url = `/category/${slug}`;
    return axiosInstance.delete(url, config);
  },

  //! @desc     Get all SubCateogries by CategoryId
  //! @route    DEL /api/category/subs/:categoryId
  //! @access   Public: Guest, User...
  getCategorySubs: (categoryId, config) => {
    const url = `/category/subs/${categoryId}`;
    return axiosInstance.get(url, config);
  },
};

export default categoryAPI;
