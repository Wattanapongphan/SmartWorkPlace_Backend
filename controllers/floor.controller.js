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
        const allfloor = [
             { id: '1', name: 'ชั้น 3', floor: 'cnx-1' },
            { id: '2', name: 'ชั้น 4', floor: 'cnx-1' },
            { id: '3', name: 'ชั้น 1', floor: 'bkk-1' },
            { id: '4', name: 'ชั้น 2', floor: 'bkk-2' },
            { id: '5', name: 'ชั้น 1', floor: 'kkc-1' },
            { id: '6', name: 'ชั้น 2', floor: 'kkc-2' },
            { id: '7', name: 'ชั้น 1', floor: 'hdy-1' },
            { id: '8', name: 'ชั้น 2', floor: 'hdy-2' },
            { id: '9', name: 'ชั้น 1', floor: 'cnx-2' },
            { id: '10', name: 'ชั้น 1', floor: 'sri-1' },
            { id: '11', name: 'ชั้น 2', floor: 'sri-1' },
        ]

        const {floor} = req.query;

        if (!floor || floor === 'all') {
            return res.status(200).json({
                success: true,
                data: allfloor.map(b => ({ name: b.name, slug: b.id })),
            });
        }else{
            const filteredFloors = allfloor.filter(b => b.floor === floor);

            return res.status(200).json({
                success: true,
                data: filteredFloors.map(b => ({ name: b.name, slug: b.id }))
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching floor", error });
    }
}