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

async function deleteOne(username, tripId) {
  // to update: need to delete from 2 places. Maybe can have a customised function for the schema
  await userDao.updateOne({ username: username }, { $pull: { trips: tripId } });
  await tripDao.findByIdAndDelete(tripId);

  const tripDataUpdated = await getAll(username);
  return tripDataUpdated;
}

async function getOne(username, tripId) {
  const tripData = await tripDao.findById(tripId);
  // console.log(tripData);

  return tripData;
}

async function updateOne(username, tripId, body) {
  const tripData = await tripDao.findById(tripId);
  console.log(tripData);
  tripData.destination = body.destination;
  tripData.description = body.description;
  tripData.startDay = body.startDay;
  tripData.endDay = body.endDay;

  await tripData.save();
  // console.log(tripData);

  return tripData;
}
