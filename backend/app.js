const express = require("express");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const app = express();
dotenv.config({ path: "./config.env" });
app.use(cookieParser());
app.use(express.json());
require("./db/conn");

app.use(require("./router/auth"));
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`backend is run on server ${PORT}`);
});
