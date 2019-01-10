const User = require("../models/User"),
  keys = require("../config/keys"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose"),
  jwt = require("jsonwebtoken");

exports.get_all_users = (req, res) => {
  User.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(players);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

exports.auth_create_user = (req, res, next) => {
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
                res.status(201).json({
                  message: "Successfully created new user"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.auth_get_user = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            errors: { form: "Authentication failed" }
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id
            },
            keys.secret,
            {
              expiresIn: "5h"
            }
          );
          return res.status(200).json({
            message: "Successful login",
            token: token
          });
        }
        res.status(401).json({
          errors: { form: "Unauthorized login" }
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.auth_delete_user = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
