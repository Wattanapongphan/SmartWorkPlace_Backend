const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    _id: { type: String},
    firstname: { type: String},
    lastname: { type: String },
    department: { type: String },
    position: { type: String},
    phone: { type: String },
},{
    timestamps: true
});


module.exports = mongoose.model('employees', employeeSchema);
