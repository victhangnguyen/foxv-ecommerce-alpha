import slugify from 'slugify';

//! imp library
import Logging from '../library/Logging.js';

//! imp config
import config from '../config/index.js';

//! imp models
import Product from '../models/product.js';

export const createProduct = async (req, res, next) => {
  console.log('__Debugger__controlers__product: ', { ...req.body });
  try {
    let image = req.file;

    if (!req.body.category) req.body.category = null;
    req.body.slug = slugify(req.body.name);

    if (!image) {
      throw new Error('Chưa đính kèm tập tin hình ảnh!');
    }

    image = 'images/' + image.filename;

    const product = await Product.create({
      ...req.body,
      image,
      reator: req.userId,
      creator: req.userId, //! creator nên tạo ở backend để bảo mật
    });

    return res.status(201).json(product);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(400).json({ message: error.message });
  }
};

// export const getProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find();

//     return res.status(200).json(products);
//   } catch (error) {
//     Logging.error('Error__ctrls__product: ' + error);
//     res.status(400).json({ message: error.message });
//   }
// };

export const getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  const count = parseInt(req.params.count);
  try {
    const products = await Product.find({})
      .limit(count)
      .populate('category') //! category
      .populate('subCategories') //! subs
      .sort([['createdAt', 'desc']])
      .exec();
    return res.status(200).json(products);
  } catch (error) {
    Logging.error('Error__ctrls__product: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const removeProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json(deletedProduct);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    let image = req.file;

    if (!req.body.category) req.body.category = null;
    req.body.slug = slugify(req.body.name);

    console.log('__Debugger__controllers__product__image: ', image);
    console.log('__Debugger__controllers__product__req.body: ', req.body);

    let product;
    if (!image) {
      product = { ...req.body };
    } else {
      image = 'images/' + image.filename;
      product = { ...req.body, image };
    }

    // let product;
    // if (image?.filename) {
    //   image = 'images/' + image.filename;
    //   product = { ...req.body, image };
    // } else {
    //   product = (({ image, ...rest }) => rest)(req.body);
    // }

    // console.log('__Debugger__controllers__product__product: ', product);

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });

    return res.status(201).json(updatedProduct);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};
