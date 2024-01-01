const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//draft, will need to add validation rules to the schema
const planSchema = new Schema(
  {
    header: { type: String, required: true },
    items: { type: [String] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
  },
  { timestampes: true }
);

module.exports = mongoose.model("Plan", planSchema);
