//! imp library
import Logging from '../library/Logging.js';

//! imp config
import config from '../config/index.js';

//! imp models
import Product from '../models/product.js';

export const createProduct = (req, res, next) => {
  const product = req.body; //! product object
  console.log('__Debugger__ctrls__productController__product: ', product);

  try {
    const newProduct = Product.create({
      ...product,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    Logging.error(error);
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getProducts = (req, res, next) => {
  try {
    const products = Product.find();
    return res.status(200).json(products);
  } catch (error) {
    Logging.error(error);
    res.status(404).json({ message: 'Something went wrong' });
  }
};
