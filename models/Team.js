var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  logo_url: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
});

export default mongoose.model("Team", TeamSchema);
