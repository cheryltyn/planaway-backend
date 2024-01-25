const userMdl = require("../models/users");

// highlight-start
module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  createUser,
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
