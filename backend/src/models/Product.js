import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    itemNumber: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be positive'],
    },
    badge: {
      type: String,
      default: 'New',
    },
    primaryImage: {
      type: String,
      required: [true, 'A product must have a primary front image'],
    },
    hoverImage: {
      type: String,
      required: [true, 'A product must have an alternate hover image'],
    },
    description: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
