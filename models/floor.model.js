const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    _id: {type:String},
    name: { type: String},
    building_id: { type: String, ref: 'buildings'}
}, {
    timestamps: true
});

module.exports = mongoose.model('floors', floorSchema);