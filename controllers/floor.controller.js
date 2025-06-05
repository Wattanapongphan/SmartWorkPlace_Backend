const floorSchema = require("../models/floor.model");

exports.getfloors = async (req, res) => {
  try {
    const { buildingId } = req.query;
    const floors = await floorSchema.find({ building_id: buildingId });

    console.log("buildingId:", buildingId);


    if (!buildingId || buildingId === "all") {
        const allfloor = await floorSchema.find({});
      return res.status(200).json({
        message: "Get floors Successfully",
        data: allfloor.map((f) => f.name),
      });
    } else {
      return res.status(200).json({
        message: `Get floors in building ${buildingId} successfully`,
        data: floors.map((f) => f.name),
      });
    }
  } catch (error) {
    console.error("Error fetching floors:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

