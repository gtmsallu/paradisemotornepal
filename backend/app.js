const express = require("express");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());
app.use(require("./router/auth"));
app.use(cookieParser());
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`backend is run on server ${PORT}`);
});
