var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    wins: Number,
    losses: Number,
    logo_url: String,
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
  },
  { timestamps: true }
);

export default mongoose.model("Team", TeamSchema);
