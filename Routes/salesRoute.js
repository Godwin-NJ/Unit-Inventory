const express = require("express");
const router = express.Router();
const {
  saleToCustomer,
  getAllSales,
  getSingleSale,
} = require("../Controllers/sales");
const { authentication } = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([authentication], saleToCustomer)
  .get([authentication], getAllSales);
router.route("/:id").get([authentication], getSingleSale);

module.exports = router;
