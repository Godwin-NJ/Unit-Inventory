const express = require("express");
const router = express.Router();
const { createCustomer, getAllCustomer } = require("../Controllers/customer");

router.route("/").post(createCustomer).get(getAllCustomer);

module.exports = router;
