import express from 'express';

//! imp ctrls
import * as productController from '../controllers/product.js';

//! imp mdw
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//! @desc     Fetch all products
//! @route    GET /api/products
//! @access   Public
router.get('/', productController.getProducts);

//! @desc     Fetch one product
//! @route    GET /api/products/idProduct
//! @access   Public
router.get('/:productId', productController.getProduct);

//! @desc     Create a new Product
//! @route    POST /api/products
//! @access   Private: Admin
router.post(
  '/',
  // authMiddleware.auth,
  upload.single('imageFile'),
  productController.createProduct
);

export default router;
