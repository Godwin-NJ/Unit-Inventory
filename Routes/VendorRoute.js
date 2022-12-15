const express = require("express");
const router = express.Router();
const {
  createVendor,
  getAllVendor,
  getSingleVendor,
  updateVendorInfo,
} = require("../Controllers/Vendor");
const {
  authentication,
  authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([authentication, authorization("admin")], createVendor)
  .get(getAllVendor);
router
  .route("/:id")
  .get([authentication], getSingleVendor)
  .patch([authentication], updateVendorInfo);

module.exports = router;
