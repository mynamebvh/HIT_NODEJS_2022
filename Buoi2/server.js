const express = require("express");
const db = require("./config/db");
const router = require("./routes/index");
const errorHandle = require("./middlewares/errorHandle");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/static", express.static("public"));

db();

router(app);
app.use(errorHandle);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
