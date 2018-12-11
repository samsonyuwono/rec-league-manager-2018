var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
