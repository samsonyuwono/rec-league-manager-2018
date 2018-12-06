var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path"),
  favicon = require("serve-favicon"),
  logger = require("morgan");

const router = express.Router(),
  keys = require("./config/keys");

mongoose.connect(keys.mongoURI);
let teamRoute = require("./routes/team"),
  playerRoute = require("./routes/player"),
  authRoute = require("./routes/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(teamRoute);
app.use(playerRoute);
app.use(authRoute);
app.use(express.static("views"));
app.use(logger("dev"));

app.use((req, res, next) => {
  console.log(`${new Date().toString()}=> ${req.originalUrl}`);
  next();
});

app.use((req, res) => {
  res.status(404).send("We think you are lost");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
