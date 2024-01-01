//route to hanle all user-related operations

var express = require("express");
var userCtrl = require("../controllers/users");
var router = express.Router();

//under route: /users
router.post("/", userCtrl.newUser);
router.get("/:userid", userCtrl.getOneUser);
router.patch("/:userid", userCtrl.updateOneUser);
router.delete("/:userid", userCtrl.deleteOneUser);

module.exports = router;
