const path = require("path");

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
const PORT = process.env.PORT;

app.use(require("./router/auth"));

// "dev": "nodemon app.js",
//     "frontend": "cd frontend && npm start",
// "start": "concurrently \"npm run dev\" \"npm run frontend\""

//for local server
// "dev": "nodemon app.js",
// "frontend": "cd frontend && npm start",
// "start": "concurrently \"npm run dev\" \"npm run frontend\""

// for heroku server
// "start": "node app.js",
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/", "index.html"));
});

app.listen(PORT, () => {
  console.log(`backend is run on server ${PORT}`);
});
