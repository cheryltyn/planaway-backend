import Joi from "joi";
import bcrypt from "bcryptjs";
import _ from "lodash";
import asyncHandler from "#middlewares/asyncHandler";
//import { User, validateUser } from "#models/user_model";

function validateLogin(user) {
    const schema = Joi.object ({
        password: Joi.string().required(),
        email: Joi.string().required()
    });

    return schema.validate(user);
}

// to check if 
function validateUpdateUser(user) {
    const schema = Joi.object ({
        password: Joi.string().optional(),
        email: Joi.string().email().optional(),
        userName: Joi.string().optional(),
    });
    return schema.validate(user);
}
//to create account
const createUser = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
  
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error?.details[0]?.message });
    }
  
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, message: "Email already exists." });
    } else {
      let newUser = await new User(
        _.pick(req.body, ["userName", "email", "password"])
      ).save();
  
      if (newUser) {
        return res.status(201).json({
          status: true,
          message: "User created successfully",
          user: newUser,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Something went wrong",
        });
      }
    }
  });

