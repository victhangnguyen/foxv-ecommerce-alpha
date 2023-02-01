import express from 'express';
//! imp ctrls
import * as categoryController from '../controllers/category.js';
//! mdw
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
//! routes
router.post(
  '/category',
  authMiddleware.auth,
  categoryController.createCategory
);
router.get('/categories', categoryController.getCategories);
router.get(
  '/category/:slug',
  // authMiddleware.auth, //! ???
  categoryController.getCategory
);
router.put(
  '/category/:slug',
  authMiddleware.auth,
  categoryController.updateCategory
);

//! @desc     Delete a Category by Slug
//! @route    DEL /api/category/:slug
//! @access   Private: admin, ...
router.delete(
  '/category/:slug',
  authMiddleware.auth,
  categoryController.removeCategory
);

router.get('/category/subs/:categoryId', categoryController.getSubs);

export default router;
