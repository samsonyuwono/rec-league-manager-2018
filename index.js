var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path"),
  favicon = require("serve-favicon"),
  logger = require("morgan");

//Require Routes
var teamRoutes = require("./routes/team");
var playerRoutes = require("./routes/player");
var authRoutes = require("./routes/auth");
import { getSecret } from "./secrets";

const API_PORT = process.env.API_PORT || 3001;

mongoose.Promise = require("bluebird");

mongoose.connect(getSecret("dbUri"));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "build")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use("/api");

app.use(function(req, res) {
  res.render("404");
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
