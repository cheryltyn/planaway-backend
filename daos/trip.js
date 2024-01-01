const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//draft, will need to add validation rules to the schema
const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    startDay: { type: Date, required: true },
    endDay: { type: Date, required: true },
    description: { type: String },
    toShare: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestampes: true }
);

module.exports = mongoose.model("Trip", tripSchema);
