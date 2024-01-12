var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
require("./client/mongo");
const cors = require("cors");

var usersRouter = require("./routes/users");
var tripsRouter = require("./routes/trips");
var plansRouter = require("./routes/plans");
//to update: to be removed after finished
var testsRouter = require("./routes/tests");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/users", usersRouter);
//to update: to be removed after finished
app.use("/tests", testsRouter);
app.use("/", tripsRouter);
app.use("/", plansRouter);

module.exports = app;
