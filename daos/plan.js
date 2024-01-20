const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Plan Schema
const planSchema = new Schema(
  {
    header: { type: String, required: true },
    description: { type: [String] },
    tripID: { type: Schema.Types.ObjectId, ref: "Trip" },
  },
  { timestamps: true }
);

// Create and export the Plan model
const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
