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

    let zonesToReturn = [];

    if (!floorId || floorId === "all") {
      filterzone = allZone;
    } else {
      filterzone = allZone.filter(
        (z) => Array.isArray(z.floor_id) && z.floor_id.includes(floorId)
      );
    }

    // เรียงชื่อโซน A-Z
    filterzone.sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );

    const responseData = filterzone.map((z) => ({
      name: z.name
    }));

    return res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching zone", error });
  }
};
