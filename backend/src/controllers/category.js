import slugify from 'slugify';

//! imp library
import Logging from '../library/Logging.js';

//! imp models
import Category from '../models/category.js';

export const createCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await new Category({ name, slug: slugify(name) }).save();

    res.status(201).json(category);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(404).json({ message: error.message });
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(categories);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(404).json({ message: error.message });
  }
};

// getCategory
export const getCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    res.status(200).json(category);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(404).json({ message: error.message });
  }
};

export const updateCategory = async (req, res, next) => {
  const { slug } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(404).json({ message: error.message });
  }
};

export const removeCategory = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug });
    res.json(deletedCategory); //! return deletedCategory
  } catch (error) {
    Logging.error('Error__ctrls__Category: ' + error);
    res.status(404).json({ message: error.message });
  }
};
