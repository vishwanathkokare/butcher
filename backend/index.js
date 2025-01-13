import express  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './database/index.js';
import orderRouter from './routes/order.js';
import marketRouter from './routes/market.js';
import cors from 'cors';

// configure dot env
dotenv.config();

// connection to database
connectDB();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE'
}));

//routes
app.use('/v1/order',orderRouter)
app.use('/v1/market',marketRouter)

app.listen(port,()=>{
    console.log('server started on',port);
});