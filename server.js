import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets";
import Team from "./models/team";

var app = express();
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
  Team.find((err, teams) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: teams });
  });
});

router.post("/teams", (req, res) => {
  const team = new Team();
  const { name, wins, losses, logo_url } = req.body;

  if (!name || !wins || !losses || !logo_url) {
    return res.json({
      success: false,
      error: "You must complete the form properly"
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
app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
