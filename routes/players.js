const express = require("express"),
  router = express.Router(),
  checkAuth = require("../middleware/check-auth"),
  PlayersController = require("../controllers/players");

router.get("/players", PlayersController.players_get_all);

router.get(
  "/user/players",
  checkAuth,
  PlayersController.players_get_user_players
);

router.post(
  "/teams/:teamId/player",
  checkAuth,
  PlayersController.players_create_player
);

router.get("/players/:id", checkAuth, PlayersController.players_get_player);

router.put("/players/:id", checkAuth, PlayersController.players_edit_player);

router.delete(
  "/players/:id",
  checkAuth,
  PlayersController.players_delete_player
);

router.use("/api", router);

module.exports = router;
