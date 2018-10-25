import { getSecret } from "./secrets";
const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(getSecret("dbUri"));
