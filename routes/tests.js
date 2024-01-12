//for test and data initialization purpose

var express = require("express");
var testCtrl = require("../controllers/tests.js");
var router = express.Router();

//under route: /tests
router.post("/create/newuser", testCtrl.createNewUser);
router.post("/create/trip/:username", testCtrl.addOldTrip);

// router.get("/:username/trips", tripCtrl.getAllTrips);

// router.post("/:username/trips", tripCtrl.newTrip);
// router.get("/:username/trips/:tripid", tripCtrl.getOneTrip);
// router.patch("/:username/trips/:tripid", tripCtrl.updateOneTrip);
// router.delete("/:/username/trips/:tripid", tripCtrl.deleteOneTrip);

module.exports = router;
