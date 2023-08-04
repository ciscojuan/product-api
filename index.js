const express = require('express');
const morgan = require('morgan'); //see http logs
const cors = require('cors')
const mongoose = require('mongoose'); // conectar con mongo db
const authJwt = require('./helpers/jwt');

require('dotenv').config();
const app = express();

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
//app.use(authJwt);


//routes
const api = process.env.API_url
//const route = '/api/v1'
app.use(api + '/products', productRouter);
app.use(api + '/users',  userRouter);
app.use(api + '/categories', categoryRouter);
app.use(api + '/orders', orderRouer);

//database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("You have been connected to the Database successfully."))
    .catch((err) => console.log(err))

//server
app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
});

module.exports = app;
