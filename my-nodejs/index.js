require("dotenv").config();
const express = require("express");
const auth_routes = require("./routes/auth");
const app = express();
const path = require("path");
const ejs = require("ejs");

const { mongoConnect } = require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", auth_routes); // Authentication Route

const PORT_NO = 3001;

mongoConnect()
  .then(() => {
    app.listen(PORT_NO, () => {
      console.log(`✅ Server listening on port no: ${PORT_NO}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB error:", err);
  });
