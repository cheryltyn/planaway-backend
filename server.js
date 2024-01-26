var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var User = require("./daos/user");
var securityMiddleware = require("./middlewares/security");
var connectDB = require("./client/mongo");

require("dotenv").config();
require("./routes/index");

var usersRouter = require("./routes/users");
var tripsRouter = require("./routes/trips");
var plansRouter = require("./routes/plans");
//to update: to be removed after finished
var testsRouter = require("./routes/tests");
var authRoutes = require("./routes/auth.routes");

connectDB();
const app = express();

// // view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//to include the same value in Access-control-allow origin
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // This is important for cookies or auth headers
};

/*****  Middlewares  *****/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(cors());
app.use(cors(corsOptions));

app.use(securityMiddleware.checkJWT);

app.use("/users", usersRouter);
app.use("/trips", tripsRouter);
app.use("/plans", plansRouter);
//to update: to be removed after finished
app.use("/tests", testsRouter);
app.use("/api/auth", authRoutes);

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
