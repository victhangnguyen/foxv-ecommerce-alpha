import mongoose from 'mongoose';
//! StatusSchema
const statusSchema = new mongoose.Schema({
  value: {
    type: String,
    enum: ['none', 'new', 'trend', 'sale', 'event', 'freeship'],
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true, // For the Product must be unique to its product,
      lowercase: true,
      index: true, //! this way we can query the database on the slug.
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
      text: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
      maxLength: 32,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
    sold: { type: Number, default: 0 },
    quantiry: {},

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    image: {},
    shipping: { type: String, enum: ['yes', 'no'] },
    color: {
      type: String,
      enum: ['black', 'brown', 'silver', 'white', 'blue'],
    },
    brand: {
      Type: String,
      enum: ['luis-vuiton', 'gucci', 'dior'],
    },
    // rating: [
    //   {
    //     type: Number,
    //     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //   },
    // ],
    discount: {
      type: Number,
      default: 0,
    },
    // discounted_price = original_price - (original_price * discount / 100)
    status: {
      type: [statusSchema],
      default: { value: 'new' },
      refs: statusSchema,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
