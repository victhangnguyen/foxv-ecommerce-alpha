import express from 'express';
//! imp ctrls
import * as subCategoryController from '../controllers/subCategory.js';
//! mdw
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/subcategories', subCategoryController.getSubCategories);

router.get(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.getSubCategory
);

router.post(
  '/subcategory',
  authMiddleware.auth,
  subCategoryController.createSubCategory
);

router.put(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.updateSubCategory
);

router.delete(
  '/subcategory/:slug',
  authMiddleware.auth,
  subCategoryController.removeSubCategory
);

export default router;
