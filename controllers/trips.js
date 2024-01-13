const tripMdl = require("../models/trips");

module.exports = {
  newTrip,
  getOneTrip,
  getAllTrips,
  updateOneTrip,
  deleteOneTrip,
};

//get an existing trip's details
async function getAllTrips(req, res) {
  //tbc how to pass user info here?
  //req.params: {username: panda}
  const userName = req.params.username;
  // console.log(`userName:${userName}`);
  try {
    const tripData = await tripMdl.getAll(userName);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

//create a new trip
async function newTrip(req, res) {
  const userName = req.params.username;
  const body = req.body;
  try {
    const tripData = await tripMdl.createOne(userName, body);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

//get an existing trip's details
async function getOneTrip(req, res) {}

//update an existing trip's details
async function updateOneTrip(req, res) {}

//delete an existing trip
async function deleteOneTrip(req, res) {}
