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