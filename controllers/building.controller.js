const buildingSchema = require("../models/building.model");

exports.getbuildings = async (req, res) => {
  try {
    const { building } = req.query;
    const allbuilding = await buildingSchema.find({});

    if (!building || building === "all") {
      return res.status(200).json({
        message: "Get Buildings Successfully",
        data: allbuilding.map((b) => b.name),
      });
    } else {
      const filteredBuildings = allbuilding.filter((b) => b.id === building);

      return res.status(200).json({
        success: true,
        data: filteredBuildings.map((b) => b.name),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching buildings", error });
  }
};
