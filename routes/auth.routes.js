/* === AUTHENTICATION ROUTES ===*/
const express = require("express");
const { createUser, loginUser, logout, updateUser } = require("../controllers/auth");

const authRoutes = express.Router();

authRoutes.post("/register", createUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logout);
authRoutes.put("/update/:id", updateUser);

module.exports = authRoutes;
