const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String},
    floor_id: [{ type: String , ref: 'floors' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('zones', zoneSchema);