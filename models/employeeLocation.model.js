const mongoose = require("mongoose");

const employeeLocationSchema = new mongoose.Schema(
  {
    employee: { type: String, ref: "employees", required: true },
    zone: { type: String, ref: 'zones', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employeeLocations", employeeLocationSchema);
