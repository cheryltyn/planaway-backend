// route to handle all user-related operations

var express = require("express");
var userCtrl = require("../controllers/api");
var ensureLoggedIn = require("../config/ensureLoggedIn");
var router = express.Router();

//under route: /users
//router.post("/", userCtrl.newUser);
//router.get("/:userid", userCtrl.getOneUser);
//router.patch("/:userid", userCtrl.updateOneUser);
//router.delete("/:userid", userCtrl.deleteOneUser);
router.get("/check-token", ensureLoggedIn, userCtrl.checkToken);

module.exports = router;