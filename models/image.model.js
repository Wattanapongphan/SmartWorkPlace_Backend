const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    _id: { type: String },
    url: { type: String },
    employee_id: { type: String, ref: 'employees' },
}, {
    timestamps: true
});

module.exports = mongoose.model('images', imageSchema);