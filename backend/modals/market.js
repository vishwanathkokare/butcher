import mongoose from 'mongoose';

const productPriceSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    enum: ['Chicken', 'Mutton', 'Eggs', 'Beef']
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ProductPrice = mongoose.model('ProductPrice', productPriceSchema);

export default ProductPrice;