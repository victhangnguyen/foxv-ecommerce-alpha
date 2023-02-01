import slugify from 'slugify';

//! imp library
import Logging from '../library/Logging.js';

//! imp models
import SubCategory from '../models/subCategory.js';
import Product from '../models/product.js';

export const createSubCategory = async (req, res, next) => {
  const { name, parent } = req.body;

  try {
    const subCategory = await new SubCategory({
      name,
      slug: slugify(name),
      parent,
    }).save();

    await subCategory.populate({ path: 'parent' });

    res.status(201).json(subCategory);
  } catch (error) {
    Logging.error('Error__ctrls__SubCategory: ' + error);
    res.status(400).json({ message: 'Create SubCategory failed!' });
  }
};

export const getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(subCategories);
  } catch (error) {
    Logging.error('Error__ctrls__SubCategory: ' + error);
    res.status(404).json({ message: error.message });
  }
};

export const getSubCategory = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const subCategory = await SubCategory.findOne({ slug }).exec();

    const products = await Product.find({ subCategories: subCategory })
      .populate('category')
      .exec();

    res.status(200).json({ subCategory, products });
  } catch (error) {
    Logging.error('Error__ctrls__SubCategory: ' + error);
    res.status(404).json({ message: error.message });
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { slug } = req.params;
  const { name, parent } = req.body;
  Logging.success('name: ' + name + ' - parent: ' + parent);

  try {
    const updatedSubCategory = await SubCategory.findOneAndUpdate(
      { slug: slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    Logging.error('Error__ctrls__SubCategory: ' + error);
    res.status(400).json({ message: error.message });
  }
};

export const removeSubCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const deletedSubCategory = await SubCategory.findOneAndDelete({ slug });
    res.json(deletedSubCategory); //! return deletedCategory
  } catch (error) {
    Logging.error('Error__ctrls__SubCategory: ' + error);
    res.status(404).json({ message: error.message });
  }
};
