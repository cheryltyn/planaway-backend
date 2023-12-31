//route to hanle all trips-related operations

var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();

//under route: /
//tbc: do we need the tripid in the route path?

//create a new plan under the trip
router.post("/trips/:tripid/plans", planCtrl.newPlan);
//view all plans under the trip
router.get("/trips/:tripid/plans", planCtrl.getAllPlans);
//view one plan under the trip. tbc, is this route correct?
router.get("/trips/:tripid/:planid", planCtrl.getOnePlan);
//update one plan. tbc, is this route correct?
router.patch("/trips/:tripid/:planid", planCtrl.updateOnePlan);
//delete one plan. tbc, is this route correct?
router.delete("/trips/:tripid/:planid", planCtrl.deleteOnePlan);

module.exports = router;
