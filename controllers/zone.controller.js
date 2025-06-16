const zoneSchema = require('../models/zone.model');

exports.getZone = async (req, res) => {
    try {
        const zones = await zoneSchema.find().populate('name');
        return res.status(200).json(zones);
    } catch (error) {
        console.error('Error fetching zones:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getselectZone = async (req, res) => {
  try {
    const allZone = await zoneSchema.find({});
    const { floorId } = req.params;

    if (!floorId || floorId === "all") {
      filterzone = allZone;
    } else {
      filterzone = allZone.filter((z) => z.floor_id === floorId);
    }

    // เรียงชื่อโซน A-Z
    filterzone.sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );

    const responseData = filterzone.map((z) => ({
      zone_id: z._id, name: z.name, floor_id: z.floor_id 
    }));

    return res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching zone", error });
  }
};
