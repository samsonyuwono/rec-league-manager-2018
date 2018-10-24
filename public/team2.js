var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Team = require("../models/Team.js");

var passport = require("passport");
require("../config/passport")(passport);

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

/* GET ALL TEAMS */
router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  var token = getToken(req.headers);
  if (token) {
    Team.find(function(err, teams) {
      if (err) return next(err);
      res.json(teams);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

/* SAVE TEAM */
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  var token = getToken(req.headers);
  if (token) {
    Team.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

module.exports = router;
