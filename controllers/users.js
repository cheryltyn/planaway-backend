const userMdl = require("../models/users");

// highlight-start
module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  createUser,
  logoutUser,
};

async function getUsers(req, res) {
  try {
    const userData = await userMdl.getUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await userMdl.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await userMdl.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = await userMdl.createUser(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    // res.redirect("/log-in"); //SKIP old code
    res.json(userData);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    // res.render('movies/new', { errorMsg: err.message }); SKIP old code
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await userMdl.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

const updateUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    // const { error } = validateUpdateUser(req.body);
    // if (error) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: error?.details[0]?.message });
    // }
    //Find the user by ID
    let user = await User.findOne({ email: req.body.email, userName: req.body.userName });

    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "User not found." });
    }
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
      user.salt = req.body.salt; 
      user.iterations = req.body.iterations;
    }


    await user.save();

    const userWithoutPassword = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };
    console.log("USER SAVED")
    return res.status(200).send({
      status: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
  }
});

