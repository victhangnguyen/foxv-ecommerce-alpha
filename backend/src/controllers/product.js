import slugify from 'slugify';

//! imp library
import Logging from '../library/Logging.js';

//! imp config
import config from '../config/index.js';

//! imp models
import Product from '../models/product.js';

//! @desc     Create a new Product
//! @route    POST /api/products
//! @access   Admin
export const createProduct = async (req, res, next) => {
  console.log('__Debugger__controlers__product: ', { ...req.body });  
  try {
    if (req.body.category === '') req.body.category = null;
    req.body.slug = slugify(req.body.name);
    // if (!imageFile) {
    //   throw new Error('Chưa đính kèm tập tin hình ảnh!');
    // }

    // imageFile = 'images/' + imageFile.filename;
    // console.log('__Debugger__ctrls__productController__imageFile: ', imageFile);

    // const newProduct = Product.create({
    //   ...product,
    //   imageFile,
    //   creator: req.userId, //! creator nên tạo ở backend để bảo mật
    //   createdAt: new Date().toISOString(),
    // });

    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(400).json({ message: error.message });
  }
};

//! @desc     Fetch all products
//! @route    GET /api/products
//! @access   Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(400).json({ message: error.message });
  }
};

//! @desc     Fetch one product
//! @route    GET /api/products/idProduct
//! @access   Public
export const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log('__Debugger__ctrls__product__productId: ', productId);

  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(404).json({ message: 'Something went wrong' });
  }
};
