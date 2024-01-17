// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //draft, will need to add validation rules to the schema
// //related by referencing
// const userSchema = new Schema(
//   {
//     email: { type: String, required: true },
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     accountType: { type: String, enum: ["basic", "premium"], default: "basic" },
//     trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
//   },
//   { timestampes: true }
// );

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports = { User, validateUser };
