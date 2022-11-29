import express from 'express';
import * as productController from '../controllers/product.js';

const router = express.Router();

//! @desc     Create a new Product
//! @route    POST /api/products
//! @access   Admin
router.post('/', productController.createProduct);

//! @desc     Fetch all products
//! @route    GET /api/products
//! @access   Public

export default router;
