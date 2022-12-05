const express = require("express");
const router = express.Router();
const {
  stockPurchase,
  AllPurchaseDone,
  singlePurchase,
} = require("../Controllers/Purchase");
const {
  Authentication,
  Authorization,
} = require("../Middleware/authenticationMware");

router
  .route("/")
  .post([Authentication, Authorization("storeKeeper, admin")], stockPurchase)
  .get(AllPurchaseDone);
router.route("/:id").get([Authentication], singlePurchase);

module.exports = router;
