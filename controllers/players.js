const Player = require("../models/Player.js"),
  Team = require("../models/Team.js");

exports.players_get_all = (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(players);
  });
};

exports.players_get_user_players = (req, res) => {
  req.body.author = req.userData.userId;
  Player.find({ author: req.body.author }).then((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(players);
  });
};

exports.players_get_player = (req, res) => {
  req.body.author = req.userData.userId;
  Player.findById(req.params.id, (error, player) => {
    if (!player.author.equals(req.body.author)) {
      return res.json({
        success: false,
        error: "You don't have permissions to view that player"
      });
    }
  }).then(id => {
    if (!id) {
      return res.json({ success: false, error: "No player id provided" });
    }
    return res.status(200).json(id);
  });
};

exports.players_create_player = (req, res) => {
  req.body.author = req.userData.userId;
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
        team_id: req.body.team_id,
        author: req.body.author
      },
      (err, player) => {
        team.players.push(player);
        team.save(err => {
          if (err) return res.status(400).send(err);
          res.json(player);
        });
      }
    );
  });
};

exports.players_edit_player = (req, res) => {
  req.body.author = req.userData.userId;

  Player.findById(req.params.id, (error, player) => {
    if (!player.author.equals(req.body.author)) {
      throw Error("You must edit your own team");
    }
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
  req.body.author = req.userData.userId;

  Player.findById(req.params.id, (error, player) => {
    if (!player.author.equals(req.body.author)) {
      return res.json({
        success: false,
        error: "You can't delete another user's player"
      });
    }
    player.remove(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
};
