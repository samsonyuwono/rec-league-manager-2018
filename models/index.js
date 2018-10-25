const mongoose = require("mongoose");

const server = "ds213513.mlab.com:13513";
const database = "rec-league-manager";
const user = "samsonyuwono";
const password = "326Myoplex";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

module.exports.Team = require("./Team");
