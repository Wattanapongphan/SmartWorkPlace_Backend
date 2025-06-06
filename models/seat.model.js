const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    _id: { type: String },
    row: { type: String },
    tableNumber: { type: String},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    zone_id: { type: String, ref: 'zones' },
    employee_id: { type: String, ref: 'employees' , default: null },
}, {
    timestamps: true
});

module.exports = mongoose.model('seats', seatSchema);