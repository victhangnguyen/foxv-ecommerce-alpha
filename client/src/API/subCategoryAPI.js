import axiosInstance from './axiosInstance';

const subCategoryAPI = {
  //! @desc     Fetch all SubCategories
  //! @route    GET /api/subcategories
  //! @access   Public
  getSubCategories: (config) => {
    const url = `/subcategories`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Fetch one SubCategory
  //! @route    GET /api/subcategory/:slug
  //! @access   Private: Admin,
  getSubCategory: (slug, config) => {
    const url = `/subcategory/${slug}`;
    return axiosInstance.get(url, config);
  },

  //! @desc     Create a new SubCategory
  //! @route    POST /api/subcategory
  //! @access   Private: Admin
  createSubCategory: (subCategory, config) => {
    const url = `/subcategory`;
    return axiosInstance.post(url, subCategory, config);
  },

  //! @desc     Update one SubCategory
  //! @route    PUT /api/subcategory/:slug
  //! @access   Private: Admin
  updateSubCategory: (slug, subCategory, config) => {
    const url = `/subcategory/${slug}`;
    return axiosInstance.put(url, subCategory, config);
  },

  //! @desc     Delete one SubCategory
//! @route    DEL /api/subcategory/:slug
  //! @access   Private: Admin
  deleteSubCategory: (slug, config) => {
    const url = `/subcategory/${slug}`;
    return axiosInstance.delete(url, config);
  },
};

export default subCategoryAPI;
