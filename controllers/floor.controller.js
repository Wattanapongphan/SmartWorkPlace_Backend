const floorSchema = require('../models/floor.model');

exports.getfloors = async (req, res) => {
    try {
        const floors = await floorSchema.find().populate('name');
        return res.status(200).json(floors);
    } catch (error) {
        console.error('Error fetching floors:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getselectfloor = async (req, res) => {
    try {
        const allfloor = await floorSchema.find({});

        const {floor} = req.query;

        if (!floor || floor === 'all') {
            return res.status(200).json({
                success: true,
                data: allfloor.map(b => ({ name: b.name, slug: b.id})),
            });
        }else{
            const filteredFloors = allfloor.filter(b => b.building_id === floor);

            return res.status(200).json({
                success: true,
                data: filteredFloors.map(b => ({ name: b.name, slug: b.id }))
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching floor", error });
    }
}