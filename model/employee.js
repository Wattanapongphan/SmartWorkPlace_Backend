const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  department: { type: String, required: true },
  profilePicture: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);

