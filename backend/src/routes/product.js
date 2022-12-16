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
  authMiddleware.auth,
  upload.single('image'),
  productController.createProduct
);

//! @desc     Fetch one product
//! @route    GET /api/product/:productId
//! @access   Public
router.get('/product/:productId', productController.getProduct);

//! @desc     Fetch many products have limit by count
//! @route    GET /api/products/:count
//! @access   Public
router.get('/products/:count', productController.getProducts);

//! @desc     Delete one Product
//! @route    DEL /api/product/:productId
//! @access   Private
router.delete(
  '/product/:productId',
  authMiddleware.auth,
  productController.removeProduct
);

//! @desc     Update one Product
//! @route    PUT /api/product/:productId
//! @access   Private
router.put(
  '/product/:productId',
  authMiddleware.auth,
  upload.single('image'),
  productController.updateProduct
);

export default router;
