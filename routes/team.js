const express = require("express"),
  router = express.Router(),
  Team = require("../models/Team.js"),
  Player = require("../models/Player.js"),
  checkAuth = require("../middleware/check-auth");

router.get("/teams/error", (req, res) => {
  throw new Error("this is a forced error");
});

router.get("/teams", checkAuth, (req, res) => {
  Team.find(req.params.id)
    .populate("players")
    .exec((err, teams) => {
      if (err) return res.status(400).send(err);
      res.json(teams);
    });
});

router.get("/teams/:id", checkAuth, (req, res) => {
  Team.findById(req.params.id)
    .populate("players")
    .exec((err, team) => {
      if (err) return res.status(400).send(err);
      res.json(team);
    });
});

router.post("/teams", checkAuth, (req, res) => {
  const team = new Team();
  console.log(req.body);
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

router.put("/teams/:id", checkAuth, (req, res) => {
  Team.findById(req.params.id, (error, team) => {
    if (error) return res.json({ success: false, error });
    const { name, wins, losses, logo_url, likes } = req.body;
    if (name) team.name = name;
    if (wins) team.wins = wins;
    if (losses) team.losses = losses;
    if (logo_url) team.logo_url = logo_url;
    if (logo_url) team.likes = likes;
    team.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete("/teams/:id", checkAuth, (req, res) => {
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

router.use("/api", router);

module.exports = router;
