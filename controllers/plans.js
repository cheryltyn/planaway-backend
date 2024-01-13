const planMdl = require("../models/plans");

module.exports = {
  createPlan,
  // getOnePlan,
  // getAllPlans,
  // updateOnePlan,
  // deleteOnePlan,
};

//create a new trip
async function createPlan(req, res) {
  try {
    const tripID = req.params.tripid;

    const createdTrip = await planMdl.createOne(req.body, tripID);
    
    res.status(201).json({ message: 'Trip created successfully', data: createdTrip });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// //get an existing trip's details
// async function getOnePlan(req, res) {}

//get an existing trip's details
// async function getAllPlans(req, res) {
//   res.json({
//     plans: await planMdl.getAll(req.query),
//   });

// }

// //update an existing trip's details
// async function updateOnePlan(req, res) {}

// //delete an existing trip
// async function deleteOnePlan(req, res) {}
