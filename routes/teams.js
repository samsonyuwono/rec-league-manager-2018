const express = require("express"),
  router = express.Router(),
  Team = require("../models/Team.js"),
  Player = require("../models/Player.js"),
  checkAuth = require("../middleware/check-auth"),
  TeamsController = require("../controllers/teams");

router.get("/teams/error", (req, res) => {
  throw new Error("this is a forced error");
});

router.get("/teams", checkAuth, TeamsController.teams_get_all);

router.get("/teams/:id", checkAuth, TeamsController.teams_get_team);

router.post("/teams", checkAuth, TeamsController.teams_create_team);

router.put("/teams/:id", checkAuth, TeamsController.teams_edit_team);

router.delete("/teams/:id", checkAuth, TeamsController.teams_delete_team);

router.use("/api", router);

module.exports = router;
