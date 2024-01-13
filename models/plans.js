const { Plan, Trip } = require("../daos/trip");

module.exports = { 
    findTripById, 
    createOne,
 };

async function createOne(plans, tripID) {
    try {
        const newPlan = await Plan.create({
            header: plans.header,
            description: plans.description,
            tripID: tripID,
          });

        const trip = await Trip.findById(tripID);
        if (!trip) {
            throw new Error('Trip not found'); // Handle the error accordingly
        }

        // Push the newPlan to the trip's plans array
        trip.plans.push(newPlan);
        await trip.save();

        console.log("Plan created:", newPlan);
    } catch (error) {
        console.error("Error creating plan:", error);
    }
  }

async function findTripById(tripID) {
try {
    const trip = await Trip.findById(tripID);

    if (!trip) {
    throw new Error('Trip not found');
    }

    return trip;
} catch (error) {
    throw error; // Propagate the error to the caller
}
}
  

// function getOne() {}
// function getAll() {
//     const plans = tripDao.find({title: param})
// }

// function updateOne() {}

// function deleteOne() {}
