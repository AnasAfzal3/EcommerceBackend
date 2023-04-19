const express = require("express");
const app = express();
var mysql = require("mysql2");
const connection = require('./config/db')
require("dotenv").config();
const port = process.env.PORT;
const customerRoutes = require("./routes/customers/customerRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(customerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
