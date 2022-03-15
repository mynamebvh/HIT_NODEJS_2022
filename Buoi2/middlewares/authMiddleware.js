const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandle = require("../middlewares/asyncHandle");

module.exports.hello = function (req, res, next) {
  console.log("Hello");
  next();
};

module.exports.protect = asyncHandle(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1];

    console.log(jwt.verify(token, "hoangdz"));

    next();
  } else {
    return res.send("Không có token bạn eiii");
  }
});

module.exports.authorization = async function (req, res, next) {
  let { id } = req.query;

  let user = await User.findById(id);

  if (!user) {
    return res.send("User không tồn tại");
  }

  if (user.role !== "admin") {
    return res.send("User không có quyền");
  }

  next();
};
