const express = require("express");
const axios = require("axios");

const app = express();
const port = 80;

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${req.query.username}`,
    );

    // console.log(data);
    res.json({
      messages: [
        {
          attachment: {
            type: "image",
            payload: {
              url: data.avatar_url,
            },
          },
        },
      ],
    });
  } catch (error) {
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
