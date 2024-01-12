const usersDao = require("../daos/user");
const tripsDao = require("../daos/trip");

module.exports = {
  createNewUser,
  addOldTrip,
};

async function createNewUser(req, res) {
  //   console.log(req.body);
  // body: {"email":"123@123.com", "username":"123", "password":"123"}
  const userData = req.body;
  try {
    const createdUser = await usersDao.create(userData);
    res.json({ createdUser: createdUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

async function addOldTrip(req, res) {
  const userName = req.params.username;
  const tripData = req.body;

  //   console.log(req.body);
  // body: {"email":"123@123.com", "username":"123", "password":"123"}
  try {
    const user = await usersDao.findOne({ username: userName });
    const trip = await tripsDao.findById("659a1b04041698a1edbcc09f");
    user.trips.push(trip);
    const userUpdated = await user.save();
    res.json({ userUpdated: userUpdated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}
