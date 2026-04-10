const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Models
const Student = require("./models/Student");
const User = require("./models/User");

// ================= STUDENT ROUTES =================

// Add Student
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 🔥 HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.send("User Registered");
});

// Get All Students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Get Single Student
app.get("/student/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// Delete Student
app.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// Update Student
app.put("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// ================= AUTH ROUTES =================

// Register
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Registered");
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json({ message: "Login Success", user });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// ================= SERVER =================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});