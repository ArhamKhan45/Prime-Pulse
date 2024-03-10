const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../controller/checkAuth.js");

const router = express.Router();

// now we can make routes

router
  .route("/newproduct")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
