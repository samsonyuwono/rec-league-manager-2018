const express = require("express"),
  jwt = require("jsonwebtoken"),
  router = express.Router(),
  User = require("../models/User"),
  keys = require("../config/keys"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose");

router.post("/register", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: "Username exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Successfully created new user"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.post("/login", (req, res) => {
//   User.find({ username: req.body.username }, (err, user) => {
//     if (err) return res.status(400).send(err);
//     if (!user) {
//       res.status(400).send(new Error("No user found"));
//     } else {
//       user.comparePassword(req.body.password, function(err, isMatch) {
//         if (isMatch && !err) {
//           let token = jwt.sign(user.toJSON(), keys.secret);
//           res.json({ success: true, token: "JWT " + token });
//         } else {
//           res.status(401).send({
//             success: false,
//             msg: "Authentication failed. Wrong password."
//           });
//         }
//       });
//     }
//   });
// });

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authentication.length. Wrong Password"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.get("/user", auth.required, (req, res, next) => {
//   console.log("")
//   User.findById(req.body.id)
//     .then(function(user) {
//       if (!user) {
//         return res.sendStatus(401);
//       }
//       return res.json({ user: user.JSON() });
//     })
//     .catch(next);
// });

router.use("/api", router);

module.exports = router;
