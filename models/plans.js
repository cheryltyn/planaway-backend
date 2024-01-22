const Plan = require("../daos/plan");
const Trip = require("../daos/trip");

module.exports = { 
    findTripById, 
    createOne,
    findPlanById, 
    deleteOne,
    updateOne, 
 };

async function createOne(plans) {
    try {

        const newPlan = await Plan.create({
            header: plans.header,
            description: plans.description,
            tripID: plans.tripID,
          });

        const trip = await Trip.findById(plans.tripID);
        if (!trip) {
            throw new Error('Trip not found'); 
        }

        trip.plans.push(newPlan);
        await trip.save();

        console.log("Plan created:", newPlan);
        return newPlan;
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
    throw error; 
}
}

async function findPlanById(planID) {
    try {
        const plan = await Plan.findById(planID);
        if (!plan) {
        throw new Error('Plan not found');
        }
        return plan;
    } catch (error) {
        throw error; 
    }
    }
  

// function getOne() {}
// function getAll() {
//     const plans = tripDao.find({title: param})
// }

async function updateOne(planId, data) {
    try {
        const planID = planId;
        const updateData = {
            header: data.header,
            description: data.description,
          };
      
        const updatedPlan = await Plan.findOneAndUpdate({ _id: planID }, updateData, { new: true });
          if (!updatedPlan) {
            throw new Error('Plan not found');
        }
        return updatedPlan;
    } catch (error) {
        throw error; 
    }
}

async function deleteOne(planID) {
    try {

      const deletedPlan = await Plan.findByIdAndDelete(planID);
      if (!deletedPlan) {
        throw new Error('Plan not found in model');
      }
  
      // Find the corresponding Trip document
      const trip = await Trip.findOne({ "plans._id": planID });
  
      if (trip) {
        // Remove the deleted plan from the plans array
        trip.plans.pull(planID);
        await trip.save();
      } else {
        // Handle the case where the Trip document is not found
        console.error('Trip not found for the deleted plan');
      }
  
      return deletedPlan;
    } catch (error) {
      throw error;
    }
  }
  