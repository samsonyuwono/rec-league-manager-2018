var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema(
  {
    name: String,
    wins: Number,
    losses: Number,
    logo_url: String
  },
  { timestamps: true }
);

export default mongoose.model("Team", TeamSchema);
