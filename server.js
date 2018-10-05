import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets";
import Team from "./models/team";
import Player from "./models/player";

var cors = require("cors");
var app = express().use("*", cors());
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret("dbUri"));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
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
    .exec((err, teams) => {
      if (err) return res.status(400).send(err);
      res.json(teams);
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

//Player routes

router.get("/teams/:teamId/players", (req, res) => {
  Team.findById(req.params.teamId)
    .populate("players")
    .exec((err, team) => {
      if (err) return res.status(400).send(err);
      res.json(team.players);
    });
});

router.get("/players", (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: players });
  });
});

router.post("/teams/:teamId/players/", (req, res) => {
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

router.get("/players/:id", (req, res) => {
  Player.findById(req.params.id).then(id => {
    if (!id) {
      return res.json({ success: false, error: "No player id provided" });
    }
    return res.status(200).json(id);
  });
});

router.put("/players/:id", (req, res) => {
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

router.delete("/players/:id", (req, res) => {
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

app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
