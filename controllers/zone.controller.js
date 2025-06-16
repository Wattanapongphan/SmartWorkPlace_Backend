const zoneSchema = require('../models/zone.model');

exports.getselectzone = async (req, res) => {
    try {
        const allZones = await zoneSchema.find({});

        const { floor } = req.query;

        const sortByZoneName = (a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }

        if (!floor || floor === 'all') {
            return res.status(200).json({
                success: true,
                data: allZones.sort(sortByZoneName).map(z => ({ name: z.name})),
            });
        } else {
            const filteredZones = allZones.filter(z => z.floor_id[0] === floor);

            return res.status(200).json({
                success: true,
                data: filteredZones.sort(sortByZoneName).map(z => ({ name: z.name }))
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching zones", error });
    }
}