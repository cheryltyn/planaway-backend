const { Plan, Trip } = require("../daos/trip");

module.exports = { 
    findTripById, 
    createOne,
    findPlanById, 
    deleteOne,
    updateOne, 
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
            throw new Error('Trip not found'); 
        }

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

async function updateOne(data) {
    try {
        const planID = data.planid;
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
        throw new Error('Plan not found');
        }
        return deletedPlan;
    } catch (error) {
        throw error; 
    }
}
