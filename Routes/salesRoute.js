const express = require("express");
const router = express.Router();
const {
  saleToCustomer,
  getAllSales,
  getSingleSale,
} = require("../Controllers/sales");

router.route("/").post(saleToCustomer).get(getAllSales);
router.route("/:id").get(getSingleSale);

module.exports = router;
