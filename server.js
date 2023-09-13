const express = require('express');
const color = require('colors');
const morgan = require('morgan');
const db = require('./config/db');
const router = require('./routers/userRoute');
const catogryRouter = require('./routers/categoryRoute');
const productRouter = require('./routers/product');
const cors = require('cors');
//configure environment variables
require('dotenv').config();

//configure database
db.connectMongodb();


const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));


const port = process.env.PORT || 8000;

//rest APIs
app.get('/', (req, res) => {
    res.send('<h1>Welcome To Ecom Website</h1>');
})

//setting up our routes
app.use('/api/v1/user', router);
app.use('/api/v1/category', catogryRouter);
app.use('/api/v1/product', productRouter);

app.listen(port, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log(`server is running at port : ${port}`.bgGreen.white);
})