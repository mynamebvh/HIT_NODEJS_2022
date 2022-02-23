const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/static", express.static("public"));

const data = [
  { id: 1, name: "hoang", age: 20 },
  { id: 2, name: "duong", age: 21 },
];

app.get("/users", (req, res) => {
  res.json(data);
});

app.post("/users", (req, res) => {
  let user = req.body;

  data.push(user);
  res.send("Them nguoi dung thanh cong");
});

app.put("/users/:id", (req, res) => {
  let user = req.body;
  let { id } = req.params;
  let index = data.findIndex((user) => id == user.id);

  if (index === -1) return res.send("nguoi dung nay ko ton tai");

  data[index].name = user.name;
  data[index].age = user.age;

  res.send("cap nhat thanh cong");
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;

  let index = data.findIndex((user) => id == user.id);

  if (index === -1) return res.send("nguoi dung nay ko ton tai");

  data.splice(index, 1);

  res.send("xoa thanh cong");
});

app.get("/:hoang", (req, res) => {
  // console.log(req.body);
  console.log(req.query);
  //console.log(req.params);

  res.send();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
