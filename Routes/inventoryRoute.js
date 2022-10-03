const express = require("express");
const router = express.Router();
const {
  createProduct,
  createSingleProduct,
  getAllProduct,
  getSingleproduct,
} = require("../Controllers/Inventory");

router.route("/").post(createProduct).get(getAllProduct);
router.route("/:id").post(createSingleProduct).get(getSingleproduct);

module.exports = router;
