import mongoose from 'mongoose';

// Define the [Category Schema]
const categorySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Export function to create the [Category Model] model classa
const Category = mongoose.model('Category', categorySchema);

export default Category;
