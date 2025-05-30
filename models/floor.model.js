const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    _id: {type:String},
    name: { type: String},
}, {
    timestamps: true
});

module.exports = mongoose.model('floors', floorSchema);