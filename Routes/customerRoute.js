const express = require("express");
const router = express.Router();
const { createCustomer, getAllCustomer } = require("../Controllers/customer");
const {
  authentication,
  authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([authentication, authorization("admin")], createCustomer)
  .get(getAllCustomer);

module.exports = router;
