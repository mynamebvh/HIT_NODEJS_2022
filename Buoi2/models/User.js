const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Trường name này là bắt buộc"],
    minlength: [3, "Độ dài name ít nhất 3 từ"],
  },
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

module.exports = mongoose.model("users", userSchema);
