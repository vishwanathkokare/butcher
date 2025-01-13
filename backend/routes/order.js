import express from 'express';
import { createOrder,getOrders } from '../controllers/order.js';

const orderRouter = express.Router();

orderRouter.route('/create').post(createOrder);
orderRouter.route('/').get(getOrders);

export default orderRouter;