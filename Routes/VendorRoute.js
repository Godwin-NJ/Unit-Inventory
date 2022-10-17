const express = require("express");
const router = express.Router();
const {
  createVendor,
  getAllVendor,
  getSingleVendor,
  updateVendorInfo,
} = require("../Controllers/Vendor");

router.route("/").post(createVendor).get(getAllVendor);
router.route("/:id").get(getSingleVendor).patch(updateVendorInfo);

module.exports = router;
