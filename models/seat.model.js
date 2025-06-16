const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    _id: { type: String },
    tableNumber: { type: String, required: true},
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    zone_id: { type: String, ref: 'zones' },
    employee_id: { type: String, ref: 'employees' , default: null },
}, {
    timestamps: true
});

module.exports = mongoose.model('seats', seatSchema);