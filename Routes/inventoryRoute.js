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
  Authentication,
  Authorization,
} = require("../Middleware/authenticationMware");

router.route("/").post([Authentication], createProduct).get(getAllProduct);
router.route("/stockholding").get([Authentication], stockHolding);
router
  .route("/:id")
  .post([Authentication, Authorization(["user", "admin"])], createSingleProduct)
  .get(getSingleproduct);

module.exports = router;
