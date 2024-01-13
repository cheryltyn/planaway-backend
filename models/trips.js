const userDao = require("../daos/user");
const tripDao = require("../daos/trip");

module.exports = { createOne, getOne, getAll, updateOne, deleteOne };

async function getAll(username) {
  //to update: use userDao functions
  const tripData = await userDao
    .findOne({ username: username })
    .select("trips");
  // console.log(tripData);
  const tripDataPopulated = await tripData.populate("trips");
  return tripDataPopulated.trips;
}

async function createOne(username, body) {
  // console.log(`username:${username},body:${body}`);
  //to update: use userDao functions
  const userData = await userDao.findOne({ username: username });
  const newTrip = await tripDao.create(body);
  userData.trips.push(newTrip);
  const userUpdated = await userData.save();
  //to update: not sure what to return here.
  return userUpdated;
}

function getOne() {}

function updateOne() {}

function deleteOne() {}
