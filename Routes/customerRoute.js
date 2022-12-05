const express = require("express");
const router = express.Router();
const { createCustomer, getAllCustomer } = require("../Controllers/customer");
const {
  Authentication,
  Authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([Authentication, Authorization(["admin"])], createCustomer)
  .get(getAllCustomer);

module.exports = router;
