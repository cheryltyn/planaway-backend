/* === USER: CREATE ACCOUNT, LOGIN, UPDATE PROFILE ===*/
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const asyncHandler = require("../middlewares/asyncHandler");
const { User, validateUser } = require("../daos/user");


function validateLogin(user) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  });

  return schema.validate(user);
}

/* === to update user information === */
function validateUpdateUser(user) {
  const schema = Joi.object({
    password: Joi.string().optional(),
    email: Joi.string().email().optional(),
    userName: Joi.string().optional(),
  });
  return schema.validate(user);
}
/* === to update user information === */
const createUser = asyncHandler(async (req, res) => {
  console.log("Request received:", req);
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

/* === user login === */
const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(404)
      .send({ status: false, message: "invalid email or password." });

  const validPassword = await bcrypt.compare(req.body.password, user?.password);

  if (!validPassword)
    return res
      .status(404)
      .send({ status: false, message: "Invalid email or password." });

  /* === create a user object with only necessary details === */  
  const userWithoutPassword = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    // ~ can add other necessary fields ~
  };

  res.cookie("user", userWithoutPassword, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.header("true", userWithoutPassword).status(200).send({
    status: true,
    message: `Login successfully`,
    user: userWithoutPassword,
  });
});

/* === Update profile === */  
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  //Find the user by ID
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send({ status: false, message: "User not found." });
  }
  if (req.body.userName) {
    user.userName = res.body.userName;
  }

  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
  }
  await user.save();

  const userWithoutPassword = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
  };

  return res.status(200).send({
    status: true,
    message: "User updated successfully",
    user: userWithoutPassword,
  });
});

/* === Logout === */  
const logout = asyncHandler(async (req, res) => {
  res.cookie("user", null).send("Successfully logout");
});

module.exports = { createUser, loginUser, logout, updateUser };
