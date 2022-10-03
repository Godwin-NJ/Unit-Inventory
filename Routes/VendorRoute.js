const express = require("express");
const router = express.Router();
const {
  createVendor,
  getAllVendor,
  getSingleVendor,
} = require("../Controllers/Vendor");

router.route("/").post(createVendor).get(getAllVendor);
router.route("/:id").get(getSingleVendor);

module.exports = router;
