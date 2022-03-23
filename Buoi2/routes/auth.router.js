const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.route("/login").post(authController.login);
router
  .route("/forget-password")
  .get(authController.changePassword)
  .post(authController.forgetPassword);
module.exports = router;
