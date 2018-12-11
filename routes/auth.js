const express = require("express"),
  router = express.Router(),
  AuthController = require("../controllers/auth");

router.post("/register", AuthController.auth_create_user);

router.post("/login", AuthController.auth_get_user);

router.delete("/:userId", AuthController.auth_delete_user);

router.use("/api", router);

module.exports = router;
