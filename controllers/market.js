import ProductPrice from '../modals/market.js';

// Create a new product price
export const createProductPrice = async (req, res) => {
  try {
    const { product, price } = req.body;
    const newProductPrice = new ProductPrice({ product, price });
    await newProductPrice.save();
    res.status(201).json(newProductPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing product price
export const updateProductPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updatedProductPrice = await ProductPrice.findByIdAndUpdate(
      id,
      { price },
      { new: true, runValidators: true }
    );
    if (!updatedProductPrice) {
      return res.status(404).json({ error: 'Product price not found' });
    }
    res.status(200).json(updatedProductPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all product prices
export const getProductPrices = async (req, res) => {
  try {
    const productPrices = await ProductPrice.find();
    res.status(200).json(productPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product price by product name
export const getProductPriceByName = async (req, res) => {
  try {
    const { name } = req.params;
    const productPrice = await ProductPrice.findOne({ product: name });
    if (!productPrice) {
      return res.status(404).json({ error: 'Product price not found' });
    }
    res.status(200).json(productPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};