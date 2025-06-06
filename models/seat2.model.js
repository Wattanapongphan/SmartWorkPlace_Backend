const mongoose = require('mongoose');

const seat2Schema = new mongoose.Schema({
    _id: { type: String },
    tableNumber: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    emp_id: { type: String, ref: 'employees'},
}, {
    timestamps: true
});

module.exports = mongoose.model('seats2', seat2Schema);