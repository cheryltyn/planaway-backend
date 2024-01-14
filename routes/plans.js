//route to handle all trips-related operations

var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();

//under route: /
//tbc: do we need the tripid in the route path?

//create a new plan under the trip
router.post("/:tripid", planCtrl.createPlan);
//view all plans under the trip
router.get("/:tripid/plans", planCtrl.getAllPlans);
//view one plan under the trip. tbc, is this route correct?
router.get("/:planid", planCtrl.getOnePlan);
//update one plan. tbc, is this route correct?
router.patch("/:planid", planCtrl.updateOnePlan);
//delete one plan. tbc, is this route correct?
router.delete("/:tripid", planCtrl.deleteOnePlan);

module.exports = router;
