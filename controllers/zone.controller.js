const zoneschema = require("../models/zone.model");

exports.getZones = async (req, res) => {
  try {
    const { floorId } = req.query;
    const allZone = await zoneschema.find({});
    const zones = await zoneschema.find({ floor_id: floorId });

    if (!floorId || floorId === "all") {
      return res.status(200).json({
        message: "Get Zones Successfully",
        data: allZone.map((z) => z.name),
      });
    } else {
      return res.status(200).json({
        message: `Get Zones in floor ${floorId} successfully`,
        data: zones.map((z) => z.name),
      });
    }
  } catch (error) {
    console.error("Error fetching zones:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
