const express = require("express"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/User"),
  keys = require("../config/keys");

require("../config/passport")(passport);

router.post("/register", (req, res) => {
  const user = new User();
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      error: "You forgot to fill in a section."
    });
  }
  user.username = username;
  user.password = password;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: "Successfully created new user." });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user) {
      res.status(400).send(new Error("No user found"));
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          let token = jwt.sign(user.toJSON(), keys.secret);
          res.json({ success: true, token: "JWT " + token });
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password."
          });
        }
      });
    }
  });
});

router.use("/api", router);

module.exports = router;
