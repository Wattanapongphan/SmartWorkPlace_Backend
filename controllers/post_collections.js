const floorModel = require("../model/floor");
const zoneModel = require("../model/zone");

exports.AddFloors = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await floorModel.findOne({ name });
    if (exists) {
      return res.status(400).json({
        message: "floor is already",
      });
    }

    const newFloor = new floorModel({
      name,
    });

    const saveFloor = await newFloor.save();
    res.status(201).json({
      message: "Create Floor is Sucessful",
      data: saveFloor,
    });
  } catch (error) {
    res.status(401).json({
      message: "Cannot Create Floor !!",
      error: error.message,
    });
  }
};

exports.AddZones = async (req, res) => {
  try {
    const { _id, name, floor_id } = req.body;

    // ตรวจสอบ zone ที่มีชื่อเดียวกันในชั้นเดียวกันหรือยัง
    const exists = await zoneModel.findOne({ name, floor_id });

    if (exists) {
      return res.status(400).json({
        message: "Zone name is already used in this floor",
      });
    }

    const newZone = new zoneModel({
      _id,
      name,
      floor_id,
    });

    const saveZone = await newZone.save();

    res.status(201).json({
      message: "Create Zone is Successful",
      data: saveZone,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Create Zone !!",
      error: error.message,
    });
  }
};

