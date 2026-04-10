const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  course: String,
  email: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);