const mongoose = require("mongoose");
var Schema = mongoose.Schema,
  mongoUrl = require("../secrets");

mongoose.connect(mongoUrl.secrets.dbUri);

var TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    wins: { type: Number, required: true, minlength: 1 },
    losses: { type: Number, required: true, minlength: 1 },
    logo_url: { type: String, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
  },
  { timestamps: true }
);

let Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
