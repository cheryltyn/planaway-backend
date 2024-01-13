//route to hanle all trips-related operations

var express = require("express");
var tripCtrl = require("../controllers/trips");
var router = express.Router();

//under route: /
router.get("/:username/trips", tripCtrl.getAllTrips);
router.post("/:username/trips", tripCtrl.newTrip);

router.get("/:username/trips/:tripid", tripCtrl.getOneTrip);
router.patch("/:username/trips/:tripid", tripCtrl.updateOneTrip);
router.delete("/:/username/trips/:tripid", tripCtrl.deleteOneTrip);

module.exports = router;
