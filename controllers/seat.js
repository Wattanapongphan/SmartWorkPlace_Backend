const seatModel = require('../model/seat')

exports.getseats = async (req,res) =>{
        const seat = await seatModel.find()
    res.status(200).json({
        message:"Get Seats Successfull",
        data:seat
    })
}
exports.addseats = async (req,res) =>{
        const seat = await seatModel.find()
    res.status(200).json({
        message:"Get Seats Successfull",
        data:seat
    })
}
