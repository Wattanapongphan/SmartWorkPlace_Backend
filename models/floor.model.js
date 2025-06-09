const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    _id: {type:String , required: true},
    name: { type: String ,required: true },
    building_id: { type: String, ref: 'buildings' },
    floorNumber: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('floors', floorSchema);