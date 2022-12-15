const express = require("express");
const router = express.Router();
const {
  createProduct,
  createSingleProduct,
  getAllProduct,
  getSingleproduct,
  stockHolding,
} = require("../Controllers/Inventory");
const {
  authentication,
  authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .get(authentication, authorization("admin", "user"), getAllProduct)
  .post([authentication], createProduct);

router.route("/stockholding").get([authentication], stockHolding);
router
  .route("/:id")
  .post([authentication, authorization("user", "admin")], createSingleProduct)
  .get(getSingleproduct);

module.exports = router;
