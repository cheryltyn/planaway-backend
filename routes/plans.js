//route to hanle all trips-related operations

var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();

//under route: /plans
//tbc: do we need the userid/tripid in the route path?
router.post("/", planCtrl.newPlan);
router.get("/", planCtrl.getAllPlans);
router.get("/:planid", planCtrl.getOnePlan);
router.patch("/:planid", planCtrl.updateOnePlan);
router.delete("/:planid", planCtrl.deleteOnePlan);

module.exports = router;
