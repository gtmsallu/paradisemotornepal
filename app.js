const express = require("express");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const app = express();
dotenv.config({ path: "./config.env" });
app.use(cookieParser());
app.use(express.json());
require("./db/conn");

app.use(express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./router/auth"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`backend is run on server ${PORT}`);
});
