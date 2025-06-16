const mongoose = require("mongoose");

const employeeLocationSchema = new mongoose.Schema(
  {
    emp_id: { type: String, ref: "employees", required: true },
    zone: { type: String, ref: 'zones', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employeeLocations", employeeLocationSchema);
