const Player = require("../models/Player.js"),
  Team = require("../models/Team.js");

exports.players_get_all = (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(players);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

exports.players_create_player = (req, res) => {
  Team.findOne({ _id: req.params.teamId }, (err, team) => {
    if (err) return res.status(400).send(err);
    if (!team) return res.status(400).send(new Error("No team"));
    Player.create(
      {
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        image_url: req.body.image_url,
        likes: req.body.likes,
        team_id: req.body.team_id
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
};

exports.players_get_player = (req, res) => {
  Player.findById(req.params.id)
    .then(id => {
      if (!id) {
        return res.json({ success: false, error: "No player id provided" });
      }
      return res.status(200).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.players_edit_player = (req, res) => {
  Player.findById(req.params.id, (error, player) => {
    if (error) return res.json({ success: false, error });
    const { name, height, weight, image_url, likes, team_id } = req.body;
    if (name) player.name = name;
    if (height) player.height = height;
    if (weight) player.weight = weight;
    if (image_url) player.image_url = image_url;
    if (likes) player.likes = likes;
    if (team_id) player.team_id = team_id;
    player.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
};

exports.players_delete_player = (req, res) => {
  Player.deleteOne(
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
  ).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};