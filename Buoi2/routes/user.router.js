const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/users").get(userController.getAll).post(userController.create);
router.route("/posts").post(userController.createPost);

router
  .route("/users/:id")
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
