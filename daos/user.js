const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
// const bcrypt = require("bcryptjs");

// const SALT_ROUNDS = 6;

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
    salt: {
      type: String,
    },
    iterations: {
      type: Number,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number,
    },
    accountType: { type: String, enum: ["basic", "premium"], default: "basic" },
    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function (next) {
//   // runs before savings a user
//   if (this.isNew) {
//     const salt = await bcrypt.genSalt(10); // generate salt for hashing
//     this.password = await bcrypt.hash(this.password, salt); //hash the pw
//   }
//   return next(); // if the user isn't modified, process without hashing
// });

// UserSchema.pre('save', async function(next) {
//   // 'this' is the user document
//   if (!this.isModified('password')) return next();
//   // Replace the password with the computed hash
//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
// });

function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    salt: Joi.string().required(),
    iterations: Joi.number().required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports = { User, validateUser };
