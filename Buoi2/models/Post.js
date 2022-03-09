const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("posts", postSchema);
