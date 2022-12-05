import mongoose from 'mongoose';
//! StatusSchema
const statusSchema = new mongoose.Schema({
  value: {
    type: String,
    enum: ['none', 'new', 'trend', 'sale', 'event', 'freeship'],
  },
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: String,
  tags: [String],

  imageFile: {},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  // discounted_price = original_price - (original_price * discount / 100)
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: [statusSchema],
    default: ['new'],
    refs: statusSchema,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
