const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', default: null },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', default: null },
  row: { type: String, required:true },
  seatNumber: { type: String, required:true },
  isReserve: { type: Boolean, default: false },
  Employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
});

module.exports = mongoose.model("Seat", SeatSchema);
