const express = require("express");
const router = express.Router();
const {
  stockPurchase,
  AllPurchaseDone,
  singlePurchase,
} = require("../Controllers/Purchase");

router.route("/").post(stockPurchase).get(AllPurchaseDone);
router.route("/:id").get(singlePurchase);

module.exports = router;
