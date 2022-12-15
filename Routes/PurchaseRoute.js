const express = require("express");
const router = express.Router();
const {
  stockPurchase,
  AllPurchaseDone,
  singlePurchase,
} = require("../Controllers/Purchase");
const {
  authentication,
  authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([authentication, authorization("storeKeeper, admin")], stockPurchase)
  .get(AllPurchaseDone);
router.route("/:id").get([authentication], singlePurchase);

module.exports = router;
