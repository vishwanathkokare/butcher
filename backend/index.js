import express  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// configure dot env
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log('server started on',port);
});