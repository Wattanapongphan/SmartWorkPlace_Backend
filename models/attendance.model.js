const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    _id: { type: String },
    employee_id: { type: String, ref: 'employees' },
    date: { type: Date, default: Date.now },
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: { type: Date, default: null },
    status: { type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('attendances', attendanceSchema);