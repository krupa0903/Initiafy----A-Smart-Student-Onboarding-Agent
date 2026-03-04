const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  joined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);