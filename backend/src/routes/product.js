import express from 'express';

//! imp ctrls
import * as productController from '../controllers/product.js';

//! imp mdw
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//! @desc     Create a new Product
//! @route    POST /api/products
//! @access   Private: Admin
router.post(
  '/product',
  // authMiddleware.auth,
  // upload.single('imageFile'),
  productController.createProduct
);

//! @desc     Fetch all products
//! @route    GET /api/products
//! @access   Public
router.get('/products', productController.getProducts);

//! @desc     Fetch one product
//! @route    GET /api/products/idProduct
//! @access   Public
router.get('/product/:productId', productController.getProduct);

export default router;
