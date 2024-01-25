// route to handle all user-related operations

var express = require("express");
var userCtrl = require("../controllers/users");
var securityMiddleware = require("../middlewares/security");

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//under the rout /users
router.get("/", securityMiddleware.checkPermission, userCtrl.getUsers);
router.get("/login", userCtrl.getLoginDetails);
router.post("/login", userCtrl.loginUser);
router.post("/create", userCtrl.createUser); // add this route

module.exports = router;
