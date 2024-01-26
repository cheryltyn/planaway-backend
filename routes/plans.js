//route to handle all trips-related operations

var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();
// var checkToken = require("../config/checkToken");
var securityMiddleware = require("../middlewares/security");

//under route: /plan
//tbc: do we need the tripid in the route path?

//create a new plan under the trip
router.post("/:tripid", securityMiddleware.checkLogin, planCtrl.createPlan);
//view all plans under the trip
router.get("/:tripid", securityMiddleware.checkLogin, planCtrl.getAllPlans);
//view one plan under the trip. tbc, is this route correct?
router.get(
  "/:tripid/:planid",
  securityMiddleware.checkLogin,
  planCtrl.getOnePlan
);
//update one plan. tbc, is this route correct?
router.patch("/:planid", securityMiddleware.checkLogin, planCtrl.updateOnePlan);
//delete one plan. tbc, is this route correct?
router.delete(
  "/:tripid",
  securityMiddleware.checkLogin,
  planCtrl.deleteOnePlan
);

module.exports = router;
