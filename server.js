const express = require("express");
var cors = require('cors')
const app = express();
var mysql = require("mysql2");
const connection = require('./config/db')
require("dotenv").config();
const port = process.env.PORT;
const customerRoutes = require("./routes/customers/customerRoute");
const productRoutes = require("./routes/products/productRoutes");
const userAuth = require("./routes/userAuth/AuthRoutes");
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(customerRoutes);
app.use(productRoutes);
app.use(userAuth)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
