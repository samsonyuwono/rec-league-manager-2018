var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    height: { type: Number, required: true, minlength: 3 },
    weight: { type: Number, required: true, minlength: 3 },
    image_url: { type: String, required: true },
    likes: { type: Number, required: false },
    team_id: Schema.ObjectId,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: "Someone needs to create a team"
    }
  },
  { timestamps: true }
);

let Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
