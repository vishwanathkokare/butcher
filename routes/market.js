import express from 'express';
const marketRouter = express.Router();
import { createProductPrice, updateProductPrice, getProductPrices, getProductPriceByName } from '../controllers/market.js';
import { adminAuthenticate } from '../middleware/adminAuth.js';

// Route to create a new product price
marketRouter.post('/prices', adminAuthenticate, createProductPrice);

// Route to update an existing product price
marketRouter.put('/prices/:id', adminAuthenticate, updateProductPrice);

// Route to get all product prices
marketRouter.get('/prices',adminAuthenticate, getProductPrices);

// Route to get product price by product name
marketRouter.get('/prices/:name', adminAuthenticate, getProductPriceByName);

export default marketRouter;