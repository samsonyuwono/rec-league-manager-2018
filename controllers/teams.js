const Team = require("../models/Team.js");
const User = require("../models/User.js");

exports.teams_get_all = (req, res) => {
  Team.find(req.params.id)
    .populate("players")
    .exec((err, teams) => {
      if (err) return res.status(400).send(err);
      res.json(teams);
    });
};

exports.teams_get_user_teams = (req, res) => {
  req.body.author = req.userData.userId;
  Team.find({ author: req.body.author })
    .populate("players")
    .exec((err, teams) => {
      if (err) return res.status(400).send(err);
      res.json(teams);
    });
};

exports.teams_get_team = (req, res) => {
  req.body.author = req.userData.userId;
  Team.findById(req.params.id, (error, team) => {
    if (!team.author.equals(req.body.author)) {
      return res.json({
        success: false,
        error: "You don't have permissions to view that team"
      });
    }
  })
    .populate("players")
    .exec((err, team) => {
      if (err) return res.status(400).send(err);
      res.json(team);
    });
};

exports.teams_create_team = (req, res) => {
  req.body.author = req.userData.userId;
  const team = new Team(req.body).save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

exports.teams_edit_team = (req, res) => {
  req.body.author = req.userData.userId;
  Team.findById(req.params.id, (error, team) => {
    if (!team.author.equals(req.body.author)) {
      throw Error("You don't have permissions for that");
    }
    const { name, wins, losses, logo_url, likes } = req.body;
    if (name) team.name = name;
    if (wins) team.wins = wins;
    if (losses) team.losses = losses;
    if (logo_url) team.logo_url = logo_url;
    if (likes) team.likes = likes;
    team.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
};

exports.teams_delete_team = (req, res) => {
  req.body.author = req.userData.userId;
  Team.findById(req.params.id, (error, team) => {
    if (!team.author.equals(req.body.author)) {
      return res.json({
        success: false,
        error: "You can't delete another user's team"
      });
    }
    team.remove(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
};
