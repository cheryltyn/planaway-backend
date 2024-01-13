const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Plan Schema
const planSchema = new Schema(
  {
    header: { type: String, required: true },
    description: { type: [String] },
    tripID: { type: Schema.Types.ObjectId, ref: 'Trip' } 
  },
  { timestamps: true }
);

// Create and export the Plan model
const Plan = mongoose.model("Plan", planSchema);
module.exports.Plan = Plan;

// Define the Trip Schema
const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    startDay: { type: Date, required: true },
    endDay: { type: Date, required: true },
    description: { type: String },
    toShare: { type: Boolean, default: false },
    plans: [planSchema],
  },
  { timestamps: true }
);

// Create and export the Trip model
const Trip = mongoose.model("Trip", tripSchema);
module.exports.Trip = Trip;
