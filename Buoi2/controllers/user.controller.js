const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandle = require("../middlewares/asyncHandle");

module.exports.getAll = asyncHandle(async (req, res) => {
  // let users = await User.find();

  let posts = await Post.find().populate("author", "name");
  res.json(posts);
});

module.exports.create = asyncHandle(async (req, res) => {
  await User.create(req.body);
  res.status(201).send("Tạo thành công");
});

module.exports.createPost = asyncHandle(async (req, res) => {
  await Post.create(req.body);
  res.status(201).send("Tạo thành công");
});

module.exports.update = asyncHandle(async (req, res) => {
  let id = req.params.id;

  await User.findByIdAndUpdate(id, req.body);
  res.status(200).send("Cập nhật thành công");
});

module.exports.delete = asyncHandle(async (req, res) => {
  let id = req.params.id;

  await User.findByIdAndDelete(id);
  res.status(200).send("Xoá thành công");
});
