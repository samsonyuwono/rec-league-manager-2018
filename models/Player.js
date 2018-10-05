var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  _team: { type: Schema.Types.ObjectId, ref: "Team" },
  name: String,
  height: Number,
  weight: Number,
  image_url: String
});

export default mongoose.model("Player", PlayerSchema);
