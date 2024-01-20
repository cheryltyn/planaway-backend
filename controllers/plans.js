const planMdl = require("../models/plans");

module.exports = {
  createPlan,
  getOnePlan,
  getAllPlans,
  updateOnePlan,
  deleteOnePlan,
};

//create a new trip
async function createPlan(req, res) {
  try {
    const tripID = req.body.tripID;
    const createdTrip = await planMdl.createOne(req.body);
    
    res.status(201).json({ message: 'Trip created successfully', data: createdTrip });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// //get an existing trip's details
async function getOnePlan(req, res) {
  try {
    // [TO EDIT] Edit Params based on where the information is 
    // const tripID = req.params.tripid; // i dont even think i need tripID? 
    const planID = req.params.planid;
    const getPlan = await planMdl.findPlanById(planID);
    res.status(200).json({ Plan: getPlan });
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//get an existing trip's details
async function getAllPlans(req, res) {
  try {
    const tripID = req.params.tripid;
    console.log(tripID)
    const getTrip = await planMdl.findTripById(tripID);
    const plans =  getTrip.plans 
    res.status(200).json({ Plans: plans });
    // [TO EDIT] Depends on what information is needed on the FE 
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ message: 'Internal server error' });
}
}

//update an existing trip's details
async function updateOnePlan(req, res) {
  try {
    const updatedPlan = await planMdl.updateOne(req.body);
  
    res.status(200).json({ Plan: updatedPlan });
  } catch (error) {
    console.error('Error updating plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// //delete an existing trip
async function deleteOnePlan(req, res) {
  try {
    const planID = req.body.planid;
    const tripID = req.params.tripid;
    const deletePlan = await planMdl.deleteOne(planID);
    const getTrip = await planMdl.findTripById(tripID);
    const plans =  getTrip.plans 
    res.status(200).json({ Plans: plans });
  } catch (error) {
    console.error('Error deleting plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
