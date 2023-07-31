const express = require('express');
const morgan = require('morgan'); //see http logs
const cors = require('cors')
const mongoose = require('mongoose'); // conectar con mongo db
const app = express();

//cargar models
const Product = require('./models/products');
const User = require('./models/user');
const Category = require('./models/category');
const Order = require('./models/order');

const port = 3000;

//cargar rutas
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');
const orderRouer = require('./routes/orders');

//middlewares
app.use(express.json())
app.use(morgan('tiny'));//Display log requets 
app.use(cors())
app.options('*', cors())

//routes
const route = '/api/v1'
app.use(route + '/products', productRouter);
app.use(route + '/users', userRouter);
app.use(route + '/categories', categoryRouter);
app.use(route + '/orders', orderRouer);

//database
mongoose.connect('mongodb+srv://ciscojuan:call_of_duty_modern_warefare@e-shop-db.sjagxjk.mongodb.net/')
    .then(() => console.log("You have been connected to the Database successfully."))
    .catch((err) => console.log(err))

//server    
app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
});