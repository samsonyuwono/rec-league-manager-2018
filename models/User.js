var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: "Teams" }],
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
  },
  { timestamps: true }
);

let User = mongoose.model("User", UserSchema);

module.exports = User;
