import mongoose from 'mongoose';
//! const mongoose = require('mongoose');

// Define the [SubCategory Schema]
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, 'Thấp nhất 3 ký tự'],
      maxLength: [32, 'Nhiều nhất 32 ký tự'],
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

// Export function to create the [SubCategory Model] model class
// module.exports = mongoose.model('SubCategory', subcategorySchema);
const SubCategory = mongoose.model('SubCategory', subcategorySchema);
export default SubCategory;
