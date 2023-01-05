const express = require("express");
const cors = require("cors");
const { connectToServer } = require("./utils/dbConnect");
const usersRouter =require("./router/v1/user.routes")
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

app.use("/api/v1/user", usersRouter);

connectToServer((err) => {
    if (!err) {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    } else {
      console.log(err);
    }
  });
