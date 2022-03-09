const express = require("express");
const db = require("./config/db");
const router = require("./routes/index");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/static", express.static("public"));

db();

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
