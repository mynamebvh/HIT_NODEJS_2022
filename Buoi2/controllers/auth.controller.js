const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncHandle = require("../middlewares/asyncHandle");

module.exports.login = asyncHandle(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.send("Người dùng không tồn tại");
  }

  if (!(await user.isPasswordMatch(password))) {
    return res.send("Tài khoản hoặc mật khẩu sai");
  }

  const token = jwt.sign({ username }, "hoangdz", { expiresIn: "30m" });

  res.status(200).json({ token });
});
