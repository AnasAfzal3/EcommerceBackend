const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  DeleteProduct,
  mostPopularProducts,
  topSellingProducts,
  getCategories,
} = require("../../controllers/products/productController");
const router = express.Router();
const Authorize = require("../../middlewares/Auth/verifyToken");
router.get("/products", getProducts);
router.post("/product", Authorize, createProduct);
router.put("/product/:id", Authorize, updateProduct);
router.delete("/product/:id", Authorize, DeleteProduct);
router.get("/products/most-popular", Authorize, mostPopularProducts);
router.get("/products/topSellingProducts", Authorize, topSellingProducts);
router.get("/categories", getCategories);
module.exports = router;
