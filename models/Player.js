var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema(
  {
    _team: { type: Schema.Types.ObjectId, ref: "Team" },
    name: { type: String, required: true },
    height: { type: Number, required: true, minlength: 3 },
    weight: { type: Number, required: true, minlength: 3 },
    image_url: { type: String, required: true },
    likes: { type: Number, required: false }
  },
  { timestamps: true }
);

let Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
