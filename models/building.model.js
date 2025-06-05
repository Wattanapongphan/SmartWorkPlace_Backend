const mongoose = require('mongoose');
const { Schema } = mongoose;

const buildingSchema = new Schema({
    _id: { type: String},
    name: { type: String }
},{
    timestamps: true
});


module.exports = mongoose.model('buildings', buildingSchema);
