const express = require("express");
const router = express.Router();
const { Authentication } = require("../Middleware/authenticationMware");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../Controllers/userAuth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").patch([Authentication], updateUser);

module.exports = router;
