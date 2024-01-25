//route to handle all trips-related operations

var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();
var checkToken = require("../config/checkToken");

//under route: /plan
//tbc: do we need the tripid in the route path?

//create a new plan under the trip
router.post("/:tripid", checkToken, planCtrl.createPlan);
//view all plans under the trip
router.get("/:tripid", checkToken, planCtrl.getAllPlans);
//view one plan under the trip. tbc, is this route correct?
router.get("/:tripid/:planid", checkToken, planCtrl.getOnePlan);
//update one plan. tbc, is this route correct?
router.patch("/:planid", checkToken, planCtrl.updateOnePlan);
//delete one plan. tbc, is this route correct?
router.delete("/:tripid", checkToken, planCtrl.deleteOnePlan);

module.exports = router;
