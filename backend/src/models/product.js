import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
