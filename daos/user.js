const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//draft, will need to add validation rules to the schema
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ["basic", "premium"], default: "basic" },
  },
  { timestampes: true }
);

module.exports = mongoose.model("User", userSchema);
