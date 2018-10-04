var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  logo_url: { type: String, required: true },
  _players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
});

export default mongoose.model("Team", TeamSchema);
