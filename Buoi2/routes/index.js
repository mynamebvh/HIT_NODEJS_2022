const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/api", userRouter);
};
