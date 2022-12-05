const express = require("express");
const router = express.Router();
const {
  createVendor,
  getAllVendor,
  getSingleVendor,
  updateVendorInfo,
} = require("../Controllers/Vendor");
const {
  Authentication,
  Authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([Authentication, Authorization("admin")], createVendor)
  .get(getAllVendor);
router
  .route("/:id")
  .get([Authentication], getSingleVendor)
  .patch([Authentication], updateVendorInfo);

module.exports = router;
