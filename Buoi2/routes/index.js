const userRouter = require("./user.router");
const authRouter = require("./auth.router");

const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api", authMiddleware.protect, userRouter);
};
