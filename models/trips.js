const userDao = require("../daos/user");

module.exports = { createOne, getOne, getAll, updateOne, deleteOne };

async function getAll(username) {
  //to update: user userDao functions
  const tripData = await userDao
    .findOne({ username: username })
    .select("trips");
  // console.log(tripData);
  const tripDataPopulated = await tripData.populate("trips");
  return tripDataPopulated.trips;
}

function createOne() {}

function getOne() {}

function updateOne() {}

function deleteOne() {}
