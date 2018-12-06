const express = require("express"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/User");
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

router.post("/login", function(req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

router.use("/api", router);

module.exports = router;
