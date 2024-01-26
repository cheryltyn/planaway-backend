//route to hanle all trips-related operations

var express = require("express");
var securityMiddleware = require("../middlewares/security");
var tripCtrl = require("../controllers/trips");
var router = express.Router();

//under route: /trips
router.get(
  "/all/:username",
  securityMiddleware.checkLogin,
  tripCtrl.getAllTrips
);
router.get(
  "/one/:username",
  securityMiddleware.checkLogin,
  tripCtrl.getOneTrip
);
router.post("/:username", securityMiddleware.checkLogin, tripCtrl.newTrip);
router.delete(
  "/:username",
  securityMiddleware.checkLogin,
  tripCtrl.deleteOneTrip
); //tripID to be passed in by query
router.patch(
  "/:username",
  securityMiddleware.checkLogin,
  tripCtrl.updateOneTrip
); //tripID to be passed in by query

// router.get("/:tripid/", tripCtrl.getOneTrip);
// router.patch("/:username/trips/:tripid", tripCtrl.updateOneTrip);

module.exports = router;
