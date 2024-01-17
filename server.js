var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();
//require("./client/mongo");
require("./routes/index");

var usersRouter = require("./routes/users");
var tripsRouter = require("./routes/trips");
var plansRouter = require("./routes/plans");
//to update: to be removed after finished
var testsRouter = require("./routes/tests");

const app = express();

/*****  Middlewares  *****/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/users", usersRouter);
app.use("/trips", tripsRouter);
app.use("/plans", plansRouter);
//to update: to be removed after finished
app.use("/tests", testsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
