const { register, login, user } = require("../controller/authController");
const express = require("express");
const auth_router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// 🔒 Protected Route
auth_router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

auth_router.get("/", (req, res) => {
  res.send("Welcome to the authentication system!");
});

// Render Register Page
auth_router.get("/register-page", (req, res) => {
  res.render("registerPage");
});

// Process Register Form
auth_router.post("/register-page", register);

// Render Login Page
auth_router.get("/login-page", (req, res) => {
  res.render("loginPage");
});

// Process Login Form
auth_router.post("/login-page", login);

auth_router.route("/user").get(authMiddleware, user);

module.exports = auth_router;
