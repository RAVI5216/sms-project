const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
app.post("/addStudent", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send("Student Added");
});

// Get All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
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

// REGISTER (FIXED)
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();
  res.send("User Registered");
});

// LOGIN (FIXED)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send("Wrong password");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login Success",
    token,
    user
  });
});

// Root route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= SERVER =================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});