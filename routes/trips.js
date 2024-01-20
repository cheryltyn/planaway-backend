//route to hanle all trips-related operations

var express = require("express");
var tripCtrl = require("../controllers/trips");
var router = express.Router();

//under route: /trips
router.get("/all/:username", tripCtrl.getAllTrips);
router.get("/one/:username", tripCtrl.getOneTrip);
router.post("/:username", tripCtrl.newTrip);
router.delete("/:username", tripCtrl.deleteOneTrip); //tripID to be passed in by query
router.patch("/:username", tripCtrl.updateOneTrip); //tripID to be passed in by query

// router.get("/:tripid/", tripCtrl.getOneTrip);
// router.patch("/:username/trips/:tripid", tripCtrl.updateOneTrip);

module.exports = router;
