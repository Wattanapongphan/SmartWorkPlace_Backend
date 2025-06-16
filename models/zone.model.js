const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    _id: { type: String , required: true },
    name: { type: String , required: true },
    row: { type: [String] , required: true },
    tableRow: { type: [String] , required: true},
    floor_id: [{ type: String , ref: 'floors' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('zones', zoneSchema);