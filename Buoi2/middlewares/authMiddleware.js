const User = require("../models/User");

module.exports.hello = function (req, res, next) {
  console.log("Hello");
  next();
};

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
