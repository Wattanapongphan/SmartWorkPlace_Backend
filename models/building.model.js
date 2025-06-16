const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    _id: { type: String , required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
}, {
    timestamps: true
});


module.exports = mongoose.model('buildings', buildingSchema);