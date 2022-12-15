const express = require("express");
const router = express.Router();
const { authentication } = require("../Middleware/authenticationMware");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../Controllers/userAuth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").patch([authentication], updateUser);

module.exports = router;
