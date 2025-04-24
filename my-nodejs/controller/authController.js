const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get_db } = require("../config/db");
const User = require("../models/user");

const register = async (req, res) => {
  const db = get_db(); // Ensure DB is connected
  if (!db) {
    console.log("getDB is null");
  }

  //getting user login data from req.body
  const { email, password } = req.body;
  console.log(req.body);

  // Check if user already exists
  const user = await db.collection("user").findOne({ email }); // ✅ Corrected
  if (user) return res.status(400).send("User already exists");

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store user in database
    const userInfo = await db
      .collection("user")
      .insertOne({ email, password: hashedPassword });
    console.log("✅ User Registered successfully:", userInfo);
    res.redirect("/login-page");
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).send("Registration failed");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const db = get_db(); // Ensure DB is connected

  // Check if user already exists means already loggedIn
  const user = await User.findOne({ email }); // ✅ Corrected
  if (!user) return res.status(400).json({ message: "User not found" });

  try {
    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(402).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );
    console.log(token);

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Error while logging in:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

const user = async (req, res) => {
  try {
    const userData = await req.user;
    req.json({ msg: userData });
  } catch (error) {
    console.log("error from user route: ", error);
  }
};

module.exports = { register, login, user };
