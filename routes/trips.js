//route to hanle all trips-related operations

var express = require("express");
var tripCtrl = require("../controllers/trips");
var router = express.Router();

//under route: /trips
//tbc: do we need the userid in the route path?
router.post("/", tripCtrl.newTrip);
router.get("/", tripCtrl.getAllTrips);
router.get("/:tripid", tripCtrl.getOneTrip);
router.patch("/:tripid", tripCtrl.updateOneTrip);
router.delete("/:tripid", tripCtrl.deleteOneTrip);

module.exports = router;
