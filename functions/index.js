import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from '../database/index.js';
import orderRouter from '../routes/order.js';
import marketRouter from '../routes/market.js';
import cors from 'cors';
import frontendRouter from '../routes/frontend.js';

// configure dot env
dotenv.config();

// connection to database
connectDB();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_URL.split(','), 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/market', marketRouter);

// Catch-all route for API 404 errors
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Frontend routes
app.use('/', frontendRouter);

// Catch-all route for frontend 404 errors
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log('server started on', port);
});

export default app;
