var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path"),
  favicon = require("serve-favicon"),
  logger = require("morgan"),
  cors = require("cors"),
  app = express().use("*", cors());

const router = express.Router(),
  API_PORT = process.env.API_PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

let teamRoute = require("./routes/team"),
  playerRoute = require("./routes/player");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(teamRoute);
app.use(playerRoute);
app.use(express.static("views"));
app.use(logger("dev"));

app.use((req, res, next) => {
  console.log(`${new Date().toString()}=> ${req.originalUrl}`);
  next();
});

app.use((req, res, next) => {
  res.status(404).send("We think you are lost");
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.API_PORT || 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
