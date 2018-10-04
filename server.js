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
const playerRouter = express.Router({ mergeParams: true });
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
  Team.find((err, teams) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: teams });
  });
});

router.get("/teams/:id", (req, res) => {
  Team.findById(req.params.id).then(id => {
    if (!id) {
      return res.json({ success: false, error: "No team id provided" });
    }
    return res.status(200).json(id);
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

//GET /teams{:id}/players - returns all players in team
router.get("/teams/:id/players", (req, res) => {
  res.send("these are the players for team id#" + req.params.id);
});
// GET /players - returns all players
router.get("/players", (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: players });
  });
});

// POST /players - creates new player with data specified in the request body
playerRouter.post("/teams/:teamId/players/", (req, res, next) => {
  console.log(req.params.teamId);
  const player = new Player({
    player: req.body,
    _team: req.params.teamId
  });
  // const { name, height, weight, image_url } = req.body;
  // console.log(player);
  // console.log(req.body);
  // if (!name || !height || !weight || !image_url) {
  //   return res.json({
  //     success: false,
  //     error: "You forgot to fill in a section"
  //   });
  // }
  // player.name = name;
  // player.height = height;
  // player.weight = weight;
  // player.image_url = image_url;
  // player.save(err => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });

  player.save((err, doc) => {
    if (err) return res.json({ success: false, error: err });
    Team.findByIdAndUpdate(
      req.params.id,
      { $push: { _teams: doc._id } },
      { new: true },
      (err, team) => {
        if (err) res.send(err);
        res.json({ doc });
      }
    );
  });
});
// GET /players/{:id} - returns a player with given id
playerRouter.get("/players/:id", (req, res) => {
  Player.findById(req.params.id).then(id => {
    if (!id) {
      return res.json({ success: false, error: "No player id provided" });
    }
    return res.status(200).json(id);
  });
});

// PUT /players/{:id} - updates a player by id with data specified in the request body

// DELETE /players/{:id} - removes player by id
playerRouter.delete("/players/:id", (req, res) => {
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

app.use("/api", router, playerRouter);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
