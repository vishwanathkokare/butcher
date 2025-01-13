import express from 'express';
const marketRouter = express.Router();
import { createProductPrice, updateProductPrice, getProductPrices, getProductPriceByName } from '../controllers/market.js';

// Route to create a new product price
marketRouter.post('/prices', createProductPrice);

// Route to update an existing product price
marketRouter.put('/prices/:id', updateProductPrice);

// Route to get all product prices
marketRouter.get('/prices', getProductPrices);

// Route to get product price by product name
marketRouter.get('/prices/:name', getProductPriceByName);

export default marketRouter;