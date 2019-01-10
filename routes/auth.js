const express = require("express"),
  router = express.Router(),
  AuthController = require("../controllers/auth"),
  checkAuth = require("../middleware/check-auth");
const User = require("../models/User.js");

router.get("/users", AuthController.get_all_users);

router.post("/register", AuthController.auth_create_user);

router.post("/login", AuthController.auth_get_user);

router.delete("/:userId", AuthController.auth_delete_user);

router.use("/api", router);

module.exports = router;
