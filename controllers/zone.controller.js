const zoneSchema = require('../models/zone.model');
const floorSchema = require('../models/floor.model');

exports.getZones = async (req, res) => {
  try {
    const { buildingId, floorId } = req.query;

    let floorQuery = {};
    if (buildingId) floorQuery.building_id = buildingId;
    if (floorId) floorQuery._id = floorId;

    // หาชั้นทั้งหมดในตึกหรือ floor ที่ระบุ
    const floors = await floorSchema.find(floorQuery).select('_id');

    const floorIds = floors.map(f => f._id);
    const zones = await zoneSchema.find({ floor_id: { $in: floorIds } });

    res.status(200).json({
      message: "Zones fetched successfully.",
      data: zones.map(z => ({ id: z._id, name: z.name })),
    });

  } catch (error) {
    console.error("Error fetching zones:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};