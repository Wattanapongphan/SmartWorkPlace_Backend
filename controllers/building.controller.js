const buildingSchema = require('../models/building.model');

exports.getbuildings = async (req, res) => {
    try {
        const allBuildings = await buildingSchema.find({});

        const { building } = req.query;

        if (!building || building === 'all') {
            return res.status(200).json({
                success: true,
                data: allBuildings.map(b => ({ name: b.name, slug: b.id })),
            });
        } else {
            const filteredBuildings = allBuildings.filter(b => b.location === building);

            return res.status(200).json({
                success: true,
                data: filteredBuildings.map(b => ({ name: b.name, slug: b.id }))
            });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error fetching buildings", error });
    }
}

