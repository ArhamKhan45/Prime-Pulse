const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controller/userController");

const app = express();

const router = express.Router();

router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.route("/logout").get(logoutUser);

module.exports = router;
