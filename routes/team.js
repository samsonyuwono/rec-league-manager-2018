var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Team = require("../models/Team.js");

/* GET ALL TEAMS */
router.get("/", function(req, res, next) {
  Team.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* SAVE TEAM */
router.post("/", function(req, res, next) {
  Team.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
