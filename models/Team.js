var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
  name: String,
  wins: Number,
  losses: Number,
  logo_url: String,
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", TeamSchema);
