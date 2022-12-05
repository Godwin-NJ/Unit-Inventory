const express = require("express");
const router = express.Router();
const {
  saleToCustomer,
  getAllSales,
  getSingleSale,
} = require("../Controllers/sales");
const { Authentication } = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([Authentication], saleToCustomer)
  .get([Authentication], getAllSales);
router.route("/:id").get([Authentication], getSingleSale);

module.exports = router;
