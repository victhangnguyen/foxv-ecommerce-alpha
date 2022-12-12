import express from 'express';
//! imp ctrls
import * as subCategoryController from '../controllers/subCategory.js';
//! mdw
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
//! @desc     Fetch all SubCategories
//! @route    GET /api/subcategories
//! @access   Public
router.get('/subcategories', subCategoryController.getSubCategories);

//! @desc     Fetch one SubCategory
//! @route    GET /api/subcategory/:slug
//! @access   Private: Admin,
router.get(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.getSubCategory
);

//! @desc     Create a new SubCategory
//! @route    POST /api/subcategory
//! @access   Private: Admin
router.post(
  '/subcategory',
  authMiddleware.auth,
  subCategoryController.createSubCategory
);

//! @desc     Update one SubCategory
//! @route    PUT /api/subcategory/:slug
//! @access   Private: Admin
router.put(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.updateSubCategory
);

//! @desc     Delete one SubCategory
//! @route    DEL /api/subcategory/:slug
//! @access   Private: Admin
router.delete(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.removeSubCategory
);

export default router;
