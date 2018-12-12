const express = require("express"),
  router = express.Router(),
  AuthController = require("../controllers/auth"),
  checkAuth = require("../middleware/check-auth");
const User = require("../models/User.js");

router.get("/users", (req, res) => {
  User.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(players);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post("/register", AuthController.auth_create_user);

router.post("/login", AuthController.auth_get_user);

router.delete("/:userId", AuthController.auth_delete_user);

router.use("/api", router);

module.exports = router;
