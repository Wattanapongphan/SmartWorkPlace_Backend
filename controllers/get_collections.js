const floorModel = require('../model/floor')
const zoneModel = require('../model/zone')

exports.getFloors = async (req,res) =>{
        const floors = await floorModel.find()
    res.status(200).json({
        message:"Get Floors Successfull",
        data:floors
    })
}
exports.getZones = async (req,res) =>{
        const zones = await zoneModel.find()
    res.status(200).json({
        message:"Get Zones Successfull",
        data:zones
    })
}