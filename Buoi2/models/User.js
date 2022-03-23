const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Trường name này là bắt buộc"],
    minlength: [3, "Độ dài name ít nhất 3 từ"],
  },
  email: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: { type: Number, required: true, min: 18, max: 100 },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  reset_password_token: String,
  reset_password_expire: Date,
  password: String,
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(this);

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(15).toString("hex");

  console.log(this);
  this.reset_password_token = crypto
    .createHash("sha256", process.env.RESET_TOKEN_SECRET)
    .update(resetToken)
    .digest("hex");

  this.reset_password_expire =
    Date.now() + process.env.RESET_TOKEN_EXPIRE * 60 * 1000;

  return this.reset_password_token;
};

module.exports = mongoose.model("users", userSchema);
