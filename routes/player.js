var express = require("express");
var app = express.Router();
var Team = require("../models/team.js");
var Player = require("../models/player.js");

// team routes

// Player routes
app.get("/players", (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: players });
  });
});

app.post("/teams/:teamId/players/", (req, res) => {
  Team.findOne({ _id: req.params.teamId }, (err, team) => {
    if (err) return res.status(400).send(err);
    if (!team) return res.status(400).send(new Error("No team"));
    Player.create(
      {
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        image_url: req.body.image_url
      },
      (err, player) => {
        if (err) return res.status(400).send(err);
        team.players.push(player);
        team.save(err => {
          if (err) return res.status(400).send(err);
          res.json(player);
        });
      }
    );
  });
});

app.get("/players/:id", (req, res) => {
  Player.findById(req.params.id).then(id => {
    if (!id) {
      return res.json({ success: false, error: "No player id provided" });
    }
    return res.status(200).json(id);
  });
});

app.put("/players/:id", (req, res) => {
  Player.findById(req.params.id, (error, player) => {
    if (error) return res.json({ success: false, error });
    const { name, height, weight, image_url } = req.body;
    if (name) player.name = name;
    if (height) player.height = height;
    if (weight) player.weight = weight;
    if (image_url) player.image_url = image_url;
    player.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

app.delete("/players/:id", (req, res) => {
  Player.remove(
    {
      _id: req.params.id
    },
    (error, team) => {
      if (error) return res.json({ success: false, error: "Doesn't work" });
      return res.json({
        success: true,
        message: " Player successfully removed!"
      });
    }
  );
});
