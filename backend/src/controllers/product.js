import slugify from 'slugify';

//! imp library
import Logging from '../library/Logging.js';

//! imp config
import config from '../config/index.js';

//! imp models
import Product from '../models/product.js';

export const createProduct = async (req, res, next) => {
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
    const product = await Product.findById(productId)
      .populate('category')
      .populate('subCategories')
      .exec();
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

/*  Without Pagination */
// export const list = async (req, res, next) => {
//   //! createdAt/updatedAt, desc/asc, 3
//   try {
//     const { sort, order, limit } = req.body;
//     console.log('__Debugger__req.body: ', req.body);
//     console.log('Running: ', limit);
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subCategories')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (error) {
//     Logging.error('Error__ctrls__Category: ' + error);
//     res.status(400).json({ message: error.message });
//   }
// };

/*  With Pagination */
export const list = async (req, res, next) => {
  //! createdAt/updatedAt, desc/asc, 3
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4; //! willChange by width window
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subCategories')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const productsCount = async (req, res, next) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount().exec();
    // console.log('__Debugger__productsCount__total: ', total);
    res.status(200).json(total);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const productStar = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId).exec();
    // const user = await User.findOne({email: });
    console.log(req);
    //! who is updating?
    //! check if currently logged in user have already added rating to this product?
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

//! Search
const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate('category', '_id name')
      .populate('subCategories', '_id name')
      .populate('creator', '_id name')
      .exec();

    return res.json(products);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

//! Price
const handlePrice = async (req, res, priceIndex) => {
  // console.log('__Debugger__ctrls/product__priceIndex: ', priceIndex);

  try {
    const priceList = [
      [100000, 200000],
      [200000, 400000],
      [400000, 700000],
      [700000, 10000000],
    ];
    const products = await Product.find(
      priceIndex !== 0
        ? {
            price: {
              $gte: priceList[priceIndex - 1][0],
              $lte: priceList[priceIndex - 1][1],
            },
          }
        : {}
    )
      .populate('category', '_id name')
      .populate('subCategories', '_id name')
      .populate('creator', '_id name')
      .exec();

    return res.json(products);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const searchFilters = async (req, res, next) => {
  const { query } = req.body;
  const priceIndex = +req.body.priceIndex;
  try {
    // console.log('__Debugger__ctrls/product__query: ', query);
    if (query) {
      await handleQuery(req, res, query);
    }

    if (priceIndex >= 0) {
      await handlePrice(req, res, priceIndex);
    }


  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(400).json({ message: error.message });
  }
};
