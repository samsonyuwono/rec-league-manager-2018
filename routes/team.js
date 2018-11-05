var express = require("express");
var router = express.Router();
var Team = require("../models/team.js");
var Player = require("../models/player.js");

router.get("/teams/error", (req, res) => {
  throw new Error("this is a forced error");
});

router.get("/teams", (req, res) => {
  Team.find(req.params.id)
    .populate("players")
    .exec((err, teams) => {
      if (err) return res.status(400).send(err);
      res.json(teams);
    });
});

router.get("/teams/:id", (req, res) => {
  Team.findById(req.params.id)
    .populate("players")
    .exec((err, team) => {
      if (err) return res.status(400).send(err);
      res.json(team);
    });
});

router.post("/teams", (req, res) => {
  const team = new Team();
  const { name, wins, losses, logo_url } = req.body;
  if (!name || !wins || !losses || !logo_url) {
    return res.json({
      success: false,
      error: "You forgot to fill in a section"
    });
  }
  team.name = name;
  team.wins = wins;
  team.losses = losses;
  team.logo_url = logo_url;
  team.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put("/teams/:id", (req, res) => {
  Team.findById(req.params.id, (error, team) => {
    if (error) return res.json({ success: false, error });
    const { name, wins, losses, logo_url } = req.body;
    if (name) team.name = name;
    if (wins) team.wins = wins;
    if (losses) team.losses = losses;
    if (logo_url) team.logo_url = logo_url;
    console.log(team);
    team.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete("/teams/:id", (req, res) => {
  Team.remove(
    {
      _id: req.params.id
    },
    (error, team) => {
      if (error) return res.json({ success: false, error: "Doesn't work" });
      return res.json({
        success: true,
        message: " Team successfully removed!"
      });
    }
  );
});

// router.get("/teams/:teamId/players", (req, res) => {
//   Team.findById(req.params.teamId)
//     .populate("players")
//     .exec((err, team) => {
//       if (err) return res.status(400).send(err);
//       res.json(team.players);
//     });
// });

router.use("/api", router);

module.exports = router;
