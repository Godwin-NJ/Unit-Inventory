const express = require("express");
const router = express.Router();
const { saleToCustomer, getAllSales } = require("../Controllers/sales");

router.route("/").post(saleToCustomer).get(getAllSales);

module.exports = router;
