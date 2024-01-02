const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//draft, will need to add validation rules to the schema
// related by embedding
const planSchema = new Schema(
  {
    header: { type: String, required: true },
    items: { type: [String] },
  },
  { timestampes: true }
);

const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    startDay: { type: Date, required: true },
    endDay: { type: Date, required: true },
    description: { type: String },
    toShare: { type: Boolean, default: false },
    plans: [planSchema],
  },
  { timestampes: true }
);

module.exports = mongoose.model("Trip", tripSchema);
